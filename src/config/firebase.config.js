import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAvt3OOsRA_Aq30N-hn1shHwlp4UYWzHng",
  authDomain: "coaching-33e44.firebaseapp.com",
  projectId: "coaching-33e44",
  storageBucket: "coaching-33e44.appspot.com",
  messagingSenderId: "588881788974",
  appId: "1:588881788974:web:a205142f83018a65b65fbf",
  measurementId: "G-2QE5BXFNZ8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ; 
export const db = getFirestore(app) ; 