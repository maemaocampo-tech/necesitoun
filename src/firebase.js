import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNK7eX6-UcpmTHQltmVRxyg8EaCvHWSio",
  authDomain: "necesitoun-db955.firebaseapp.com",
  projectId: "necesitoun-db955",
  storageBucket: "necesitoun-db955.firebasestorage.app",
  messagingSenderId: "772396283561",
  appId: "1:772396283561:web:8e4aaa9397cf84bb3e9bb8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);