// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth,GoogleAuthProvider}from "firebase/auth"
// import {getFirestore}from "firebase/firestore"
import {getFirestore}from "firebase/firestore"




//import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



const firebaseConfig = {
  apiKey: "AIzaSyAw5uFGqXurb71T_J27YJ7niUoZ1dnPFvI",
  authDomain: "clone-2e8f1.firebaseapp.com",
  projectId: "clone-2e8f1",
  storageBucket: "clone-2e8f1.firebasestorage.app",
  messagingSenderId: "143159137203",
  appId: "1:143159137203:web:83a3f083b9cfa268f431c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const GoogleProvider = new GoogleAuthProvider(app)
export  const database = getFirestore(app)