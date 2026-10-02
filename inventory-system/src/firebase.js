import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjC81C_cHY-VIjqadlymNp3cxLPi4ufUA",
  authDomain: "inventory-management-sys-34e01.firebaseapp.com",
  projectId: "inventory-management-sys-34e01",
  storageBucket: "inventory-management-sys-34e01.firebasestorage.app",
  messagingSenderId: "641379137463",
  appId: "1:641379137463:web:48f1b32901c78aa9bdda32"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);