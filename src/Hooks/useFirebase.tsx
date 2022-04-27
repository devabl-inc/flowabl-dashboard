import * as React from "react";
import { useHistory } from "react-router";
import { auth, db } from "Config/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithPopup as firebaseSignInWithPopup,
  sendSignInLinkToEmail as firebaseSendSignInLinkToEmail,
  signInWithEmailLink as firebaseSignInWithEmailLink,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  User,
  getAdditionalUserInfo
} from "firebase/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { Tiers } from "Config/appConfig";
import { FlowablSubscription } from "Utils/types";
import { FirebaseError } from "firebase/app";

const googleProvider = new GoogleAuthProvider();

interface AuthContextInterface {
  isAuthenticating: boolean;
  subscription?: FlowablSubscription;
  user?: User;
  logout: () => void;
  sendSignInLinkToEmail: () => void;
  signInWithPopup: (args: ISignInArgs) => void;
  signInWithEmailLink: () => void;
}

interface ISignInArgs {
  tier?: string;
  interval?: string;
}

//@ts-ignore
const AuthContext = React.createContext<AuthContextInterface>();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User>();
  const [subscription, setSubscription] = React.useState<FlowablSubscription>();
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  //const history = useHistory();

  const signInWithPopup = async ({ tier, interval }: ISignInArgs) => {
    try {
      const result = await firebaseSignInWithPopup(auth, googleProvider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      setUser(result.user);

      // Set up chat
      if (result.user?.email) {
        window.$crisp.push(["set", "user:email", result.user.email]);
      }

      // Redirect to stripe if the user is new
      if (getAdditionalUserInfo(result)?.isNewUser) {
        console.log({ userStatus: getAdditionalUserInfo(result)?.isNewUser ?? "Failed to get user additional info" })
        if (tier && interval) {
          await getPriceFromProducts({ tier, interval });
        }
      } else {
        // TODO: remove this and redirect instead in the future
        // history.push("");
        console.log({ userStatus: getAdditionalUserInfo(result)?.isNewUser ?? "Failed to get user additional info" })
        if (tier && interval) {
          await getPriceFromProducts({ tier, interval });
        }
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const errorCode = firebaseError.code;
      const errorMessage = firebaseError.message;
      const credential = GoogleAuthProvider.credentialFromError(firebaseError);
      console.error({ credential, error, errorCode, errorMessage });
      // // The email of the user's account used.
      // const email = error.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  const sendSignInLinkToEmail = (email: string) => {
    return firebaseSendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000",
      handleCodeInApp: true,
    }).then(() => {
      return true;
    });
  };

  const signInWithEmailLink = (email: string, code: string) => {
    return firebaseSignInWithEmailLink(auth, email, code).then((result) => {
      setUser(result.user);
      return true;
    });
  };

  //   const signin = (email, password) => {
  //     return firebase
  //       .auth()
  //       .signInWithEmailAndPassword(email, password)
  //       .then((response) => {
  //         setUser(response.user);
  //         return response.user;
  //       });
  //   };
  //   const signup = (email, password) => {
  //     return firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then((response) => {
  //         setUser(response.user);
  //         return response.user;
  //       });
  //   };

  const logout = () => {
    return firebaseSignOut(auth).then(() => {
      setUser(undefined);
    });
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user ?? undefined);
      setIsAuthenticating(false);
      if (user) {
        try {
          const collectionRef = collection(db, "customers", user.uid, "subscriptions");
          const q = query(collectionRef, where("status", "in", ["trialing", "active"]));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.docs?.length > 0) {
            const sub = querySnapshot.docs[0].data();
            const product = (await sub.product.get()).data();
            const price = (await sub.price.get()).data();
            setSubscription({ price: price, product: product, interval: price.interval, name: product });
          } else {
            setSubscription({ price: 0, product: Tiers.Maker, interval: "monthly", name: "Maker - Early Access" });
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
    return () => unsubscribe();
  }, [isAuthenticating]);

  const values = {
    user,
    subscription,
    isAuthenticating,
    signInWithEmailLink,
    signInWithPopup,
    sendSignInLinkToEmail,
    logout,
  };

  //@ts-ignore
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// //Get Price
async function getPriceFromProducts({ tier, interval }: Required<ISignInArgs>) {
  const productsRef = collection(db, "products");
  const productsQuery = query(productsRef, where('tier', '==', tier), where('active', '==', true))
  const productsQueryResult = await getDocs(productsQuery);
  const { docs: productDocs } = productsQueryResult;
  console.log({ productDocs });

  if (productDocs.length === 0) {
    // Early return here if we don't find any docs
    return;
  }
  
  const productDoc = productDocs[0];
  console.log({ productDoc, path: `products/${productDoc.id}/prices` })
  const pricesRef = collection(db, "products", productDoc.id, "prices");
  const pricesQuery = query(pricesRef, where('interval', '==', interval), where('active', '==', true))
  const pricesQueryResult = await getDocs(pricesQuery);
  const { docs: priceDocs } = pricesQueryResult;
  console.log({ priceDocs })
  
  if (priceDocs.length === 0) {
    
    // Early return here if we don't find any docs
    return;
  }

  const priceDoc = priceDocs[0];
  console.log({ priceDoc });
  return;


  return;
};

// // Checkout function
// async function checkoutUser(user, priceId) {
//   const docRef = await firebase.firestore()
//     .collection('customers')
//     .doc(user.uid)
//     .collection('checkout_sessions')
//     .add({
//       price: priceId,
//       success_url: "https://dashboard.flowabl.io",
//       cancel_url: window.location.origin,
//     });
//   // Wait for the CheckoutSession to get attached by the extension
//   docRef.onSnapshot((snap) => {
//     const { error, url } = snap.data();
//     if (error) {
//       // Show an error to your customer and 
//       // inspect your Cloud Function logs in the Firebase console.
//       console.log("An error occured: " + error.message);
//     }
//     if (url) {
//       // We have a Stripe Checkout URL, let's redirect.
//       window.location.assign(url);
//     }
//   });
// };

