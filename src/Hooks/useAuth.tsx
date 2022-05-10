import * as React from "react";
import { useHistory } from "react-router";
import {
  onAuthStateChanged,
  signInWithPopup as firebaseSignInWithPopup,
  sendSignInLinkToEmail as firebaseSendSignInLinkToEmail,
  signInWithEmailLink as firebaseSignInWithEmailLink,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  User,
  getAdditionalUserInfo,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Tiers } from "Config/appConfig";
import { auth, db } from "Config/firebaseConfig";
import { getFunctions, httpsCallable } from "firebase/functions";
import type { FirebaseError } from "firebase/app";
import type { DocumentData, DocumentSnapshot } from "firebase/firestore";
import type { SubscriptionInterval, FlowablSubscription, Tier } from "Utils/types";

const googleProvider = new GoogleAuthProvider();

interface ISignInArgs {
  tier: Tier;
  interval: string;
}

interface AuthContextInterface {
  isAuthenticating: boolean;
  isRedirecting: boolean;
  subscription?: FlowablSubscription;
  user?: User;
  logout: () => void;
  signInWithPopup: () => void;
  signUpWithPopup: (args: ISignInArgs) => void;
}

/**
 * Hook to use auth context
 */
const AuthContext = React.createContext<AuthContextInterface>({} as AuthContextInterface);
export const useAuth = () => {
  return React.useContext(AuthContext);
};

/**
 * Auth Context
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = React.useState<User>();
  const [subscription, setSubscription] = React.useState<FlowablSubscription>();
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const history = useHistory();

  const signInWithPopup = React.useCallback(async () => {
    const result = await firebaseSignInWithPopup(auth, googleProvider);
    const { user } = result;
    setUser(user);

    // Set up chat
    if (user?.email) {
      window.$crisp.push(["set", "user:email", user.email]);
    }
    /**
     * If a new user attempts to login instead of sign up
     * we create their user in Firebase and set them to the "explorer" tier.
     * If they are an existing user just navigate to the home page
     */
    if (getAdditionalUserInfo(result)?.isNewUser) {
      const newSubToken = await createSignUpToken(
        user.email as string,
        "explorer",
        "month",
        user.displayName as string
      );
      history.push(`?signUpToken=${newSubToken}`);
    } else {
      history.push("");
    }
  }, []);

  const signUpWithPopup = React.useCallback(async ({ tier = "explorer", interval = "month" }: ISignInArgs) => {
    try {
      const result = await firebaseSignInWithPopup(auth, googleProvider);
      const { user } = result;

      // This gives you a Google Access Token. You can use it to access the Google API.
      setUser(user);

      // Set up chat
      if (user?.email) {
        window.$crisp.push(["set", "user:email", user.email]);
      }

      /**
       * First check on tier for "explorer" to NOT create Stripe subscription
       * aka why does Stripe suck here
       */
      if (tier === "explorer") {
        const newSubToken = await createSignUpToken(user.email as string, tier, interval, user.displayName as string);
        history.push(`?signUpToken=${newSubToken}`);
        return;
      }

      setIsRedirecting(true);
      // Redirect to Stripe if the user is new
      if (getAdditionalUserInfo(result)?.isNewUser) {
        // Gets data for selected tier and interval and creates subscription for user
        const priceDocId = await getPriceIdFromProducts({ tier, interval });
        if (priceDocId) {
          await checkoutUser(user, priceDocId, tier, interval);
          return;
        }
      } else {
        const userSubscription = await getUserSubscription(user);
        // Redirect to subscription page if existing user
        if (userSubscription) {
          history.push("/subscription");
          return;
        } else {
          // Gets data for selected tier and interval and creates subscription for user
          const priceDocId = await getPriceIdFromProducts({ tier, interval });
          if (priceDocId) {
            await checkoutUser(user, priceDocId, tier, interval);
            return;
          }
        }
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const errorCode = firebaseError.code;
      const errorMessage = firebaseError.message;
      const credential = GoogleAuthProvider.credentialFromError(firebaseError);
      console.error({ credential, error, errorCode, errorMessage });
    }
  }, []);

  const sendSignInLinkToEmail = React.useCallback((email: string) => {
    return firebaseSendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000",
      handleCodeInApp: true,
    }).then(() => {
      return true;
    });
  }, []);

  const signInWithEmailLink = React.useCallback((email: string, code: string) => {
    return firebaseSignInWithEmailLink(auth, email, code).then((result) => {
      setUser(result.user);
      return true;
    });
  }, []);

  const logout = React.useCallback(() => {
    return firebaseSignOut(auth).then(() => {
      setUser(undefined);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user ?? undefined);
      setIsAuthenticating(false);
      if (user) {
        const userSubscription = await getUserSubscription(user);
        if (userSubscription) {
          const sub = userSubscription.data();
          const productRef = await getDoc(sub.product);
          const product = productRef.data() as { name: string; metadata: { tier: Tier } };
          const priceRef = await getDoc(sub.price);
          const price = priceRef.data() as { unit_amount: number; interval: string };
          setSubscription({
            price: price.unit_amount,
            product: product.metadata.tier,
            interval: price.interval as SubscriptionInterval,
            name: product.name,
          });
        } else {
          // Defaults to explorer if user subscription doesn't exist
          setSubscription({ price: 0, product: Tiers.Explorer, interval: "month", name: "Explorer" });
        }
      }
    });
    return () => unsubscribe();
  }, [isAuthenticating]);

  const values = {
    user,
    subscription,
    isAuthenticating,
    isRedirecting,
    signInWithPopup,
    signUpWithPopup,
    logout,
  };

  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
}

/**
 * Auth helper functions
 */
async function getUserSubscription(user: User) {
  const collectionRef = collection(db, "customers", user.uid, "subscriptions");
  const q = query(collectionRef, where("status", "in", ["trialing", "active"]));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs?.length > 0) {
    return querySnapshot.docs[0];
  } else {
    return undefined;
  }
}

async function getPriceIdFromProducts({ tier, interval }: Required<ISignInArgs>) {
  // Products query
  const productsRef = collection(db, "products");
  const productsQuery = query(productsRef, where("metadata.tier", "==", tier), where("active", "==", true));
  const productsQueryResult = await getDocs(productsQuery);
  const { docs: productDocs } = productsQueryResult;

  if (productDocs.length === 0) {
    // Early return here if we don't find any docs
    return undefined;
  }

  // Prices query
  const productDoc = productDocs[0];
  const path = `products/${productDoc.id}/prices`;
  console.log({ productDoc, path, interval });
  const pricesRef = collection(db, path);
  const pricesQuery = query(pricesRef, where("interval", "==", interval), where("active", "==", true));
  const pricesQueryResult = await getDocs(pricesQuery);
  const { docs: priceDocs } = pricesQueryResult;

  if (priceDocs.length === 0) {
    // Early return here if we don't find any docs
    return undefined;
  }

  const priceDoc = priceDocs[0];
  return priceDoc.id;
}

async function checkoutUser(user: User, priceId: string, tier: string, interval: string) {
  const sessionDocRef = await doc(collection(db, `customers/${user.uid}`, "checkout_sessions"));
  const newSubToken = await createSignUpToken(user.email as string, tier, interval, user.displayName as string);
  if (newSubToken) {
    const redirectUrl = new URL("https://dashboard.flowabl.io");
    redirectUrl.searchParams.append("signUpToken", newSubToken);
    await setDoc(sessionDocRef, {
      price: priceId,
      success_url: redirectUrl.toString(),
      cancel_url: "https://flowabl.io/pricing",
    });
  }

  const unsub = onSnapshot(
    doc(db, `customers/${user.uid}`, "checkout_sessions", sessionDocRef.id),
    (doc: DocumentSnapshot<DocumentData>) => {
      /**
       * Subscription will emit two events for Firebase's
       * local and server writes. "hasPendingWrites" indicates the
       * server write isn't done and we want to wait for that
       */
      if (!doc.metadata.hasPendingWrites) {
        const docData = doc.data();
        if (docData) {
          if (docData.error) {
            /**
             * Show an error to your customer and
             * inspect your Cloud Function logs in the Firebase console.
             */
            console.log("An error occured: " + docData.error.message);
          }
          if (docData.url) {
            // We have a Stripe Checkout URL, let's redirect.
            window.location.assign(docData.url);
          }
        }
      }
    }
  );
}

async function createCustomerPortal() {
  //TODO: need to pass through the Firebase app?!?!
  const functions = getFunctions(app, 'us-west2');
  const createPortalLink = await httpsCallable(functions, 'ext-firestore-stripe-subscriptions-createPortalLink');
  //I think subToken needs to handle a type in the token as well of create, upgrade, downgrade, etc
  const { data } = createPortalLink({ returnUrl: 'https://dashboard.flowabl.io?signUpToken=${newSubToken}' });
  if (data.url) {
    window.location.assign(data.url);
  }
}

async function createSignUpToken(email: string, tier: string, interval: string, name: string) {
  try {
    const newSubToken = crypto.randomUUID();
    await addDoc(collection(db, "signUpTokens"), {
      name,
      email,
      tier,
      interval,
      token: newSubToken,
    });
    return newSubToken;
  } catch (e) {
    console.log(e);
  }
}

export async function getSignUpToken(token: string, email: string) {
  const tokenRef = collection(db, "signUpTokens");
  const tokenQuery = query(tokenRef, where("token", "==", token), where("email", "==", email));
  const tokenQueryResult = await getDocs(tokenQuery);
  const { docs: tokenDocs } = tokenQueryResult;

  if (tokenDocs.length === 0) {
    // Early return here if we don't find any docs
    return undefined;
  }

  return tokenDocs[0];
}

export async function deleteSignUpToken(signUpTokeDoc: QueryDocumentSnapshot<DocumentData>) {
  await deleteDoc(doc(db, "signUpTokens", signUpTokeDoc.id));
}
