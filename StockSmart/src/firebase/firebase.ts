import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIMzu9P4sGHxuDV299GWhOvRyTiAmHeBM",
  authDomain: "smartstock1987.firebaseapp.com",
  projectId: "smartstock1987",
  storageBucket: "smartstock1987.firebasestorage.app",
  messagingSenderId: "232034061717",
  appId: "1:232034061717:web:c1f3faafa24599339b3a9c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);