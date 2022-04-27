//@ts-nocheck
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
import { collection, getDocs, query, where } from "firebase/firestore";
import { Tiers } from "Config/appConfig";
import { FlowablSubscription } from "Utils/types";

const googleProvider = new GoogleAuthProvider();

interface AuthContextInterface {
  user: User;
  subscription: FlowablSubscription;
  isAuthenticating: boolean;
  signInWithPopup: (redirectPath?: string) => void;
  signInWithEmailLink: () => void;
  signInWithPopup: () => void;
  sendSignInLinkToEmail: () => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextInterface>();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);
  const [subscription, setSubscription] = React.useState<FlowablSubscription>(null);
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const history = useHistory();

  const signInWithPopup = async ({ tier, interval }: GetPriceFromProductsArgs) => {
    try {
      const result = await firebaseSignInWithPopup(auth, googleProvider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      setUser(result.user);

      // Redirect to stripe if the user is new
      if (getAdditionalUserInfo(result)?.isNewUser) {
        console.log({ userStatus: getAdditionalUserInfo(result)?.isNewUser ?? "Failed"})
        getPriceFromProducts({ tier, interval});
      } else {
        console.log({ userStatus: getAdditionalUserInfo(result)?.isNewUser ?? "Failed"})
        await getPriceFromProducts({ tier, interval});
      }

      // Set up chat
      if (result.user?.email) {
        window.$crisp.push(["set", "user:email", result.user.email]);
      }

      if (redirectPath) {
        history.push(redirectPath);
      }

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error({ credential, error, errorCode, errorMessage });
      // // The email of the user's account used.
      // const email = error.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  const sendSignInLinkToEmail = (email) => {
    return firebaseSendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000",
      handleCodeInApp: true,
    }).then(() => {
      return true;
    });
  };

  const signInWithEmailLink = (email, code) => {
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
      setUser(null);
    });
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsAuthenticating(false);

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

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

interface GetPriceFromProductsArgs {
  tier: string;
  interval: string;
}

// //Get Price
async function getPriceFromProducts({ tier, interval}: GetPriceFromProductsArgs) {
  const productsRef = collection(db, "products");
  const q = query(productsRef, [where('name', '==', tier), where('active', '==', true)])
  const getDocsQuery = await getDocs(q);
  const { docs } = getDocsQuery;
  console.log({ docs });
  return;
  // for (const doc of docs) {
  //   const pricesRef = collection(productsRef, "prices");
  //   const q = query(pricesRef, [where('interval', '==', interval), where('active', '==', true)])
  //   const getPricesQuery = await getDocs(q);
  //   doc.ref.then((priceSnapshot) => {
  //       priceSnapshot.forEach((doc) => {
  //         console.log("Price ID: " + doc.id);
  //         return doc.id;
  //       });
  //     });
  // }
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

