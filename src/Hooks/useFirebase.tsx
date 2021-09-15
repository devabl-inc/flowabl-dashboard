//@ts-nocheck
import React from "react";
import { useHistory } from "react-router";
import { auth, db } from "Config/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithPopup as fbSignInWithPopup,
  sendSignInLinkToEmail as fbSendSignInLinkToEmail,
  signInWithEmailLink as fbSignInWithEmailLink,
  signOut as fbSignOut,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Tiers } from "Config/appConfig";
import { FlowablSubscription } from "Utils/types";

const googleProvider = new GoogleAuthProvider();

interface AuthContextInterface {
  user: User;
  subscription: DocumentReference;
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

  const signInWithPopup = async (redirectPath?: string) => {
    try {
      const result = await fbSignInWithPopup(auth, googleProvider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      setUser(result.user);
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
    return fbSendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000",
      handleCodeInApp: true,
    }).then(() => {
      return true;
    });
  };

  const signInWithEmailLink = (email, code) => {
    return fbSignInWithEmailLink(auth, email, code).then((result) => {
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
    return fbSignOut(auth).then(() => {
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
          setSubscription({ price: 0, product: Tiers.Free, interval: "monthly", name: "Free" });
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
