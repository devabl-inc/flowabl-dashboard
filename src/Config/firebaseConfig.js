import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8Xj1Ze_sHYwJkOA8K_bJUShS0v4WC3v4",
  authDomain: "flowabl-dashboard.firebaseapp.com",
  projectId: "flowabl-dashboard",
  storageBucket: "flowabl-dashboard.appspot.com",
  messagingSenderId: "724503666186",
  appId: "1:724503666186:web:876152ea737ba443fc89f3",
  measurementId: "G-DJG9QZR3N4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, db, analytics, auth };
