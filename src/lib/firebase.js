// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-af60f.firebaseapp.com",
  projectId: "react-chat-af60f",
  storageBucket: "react-chat-af60f.appspot.com",
  messagingSenderId: "654023888647",
  appId: "1:654023888647:web:33f8365e06374c9337ffa2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Pass app instance here
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
