import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: window._SERVER_DATA?.FIREBASE_API_KEY || process.env.REACT_APP_FIREBASE_API_KEY,
  appId: window._SERVER_DATA?.FIREBASE_APP_ID || process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: window._SERVER_DATA?.FIREBASE_AUTH_DOMAIN || process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  measurementId: window._SERVER_DATA?.FIREBASE_MEASUREMENT_ID || process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  messagingSenderId:
    window._SERVER_DATA?.FIREBASE_MESSAGING_SENDER_ID || process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: window._SERVER_DATA?.FIREBASE_PROJECT_ID || process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: window._SERVER_DATA?.FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, db, analytics, auth };
