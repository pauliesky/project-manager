import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAwqhrptGkAwADE8eKK60zAHVQGNCk9xRE",
  authDomain: "todolist-cd1cb.firebaseapp.com",
  projectId: "todolist-cd1cb",
  storageBucket: "todolist-cd1cb.appspot.com",
  messagingSenderId: "637091649574",
  appId: "1:637091649574:web:425140fbee06c3f453aee7",
  measurementId: "G-HGGXTTT8KH",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const db = getFirestore(app);
export default auth;
