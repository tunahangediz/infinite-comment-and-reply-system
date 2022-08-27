// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDr5d0bRJWdU2F_Pyo2lD0k0WFDDP47vIs",
  authDomain: "comment-a.firebaseapp.com",
  projectId: "comment-a",
  storageBucket: "comment-a.appspot.com",
  messagingSenderId: "192069926022",
  appId: "1:192069926022:web:744793205ff97ba309e507",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
