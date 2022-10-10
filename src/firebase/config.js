// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2Me_ntNSM5M5QYavumlCOXZezYW0orXQ",
  authDomain: "react-journal-app-7af61.firebaseapp.com",
  projectId: "react-journal-app-7af61",
  storageBucket: "react-journal-app-7af61.appspot.com",
  messagingSenderId: "685428612148",
  appId: "1:685428612148:web:0b18cdb62657a0cb67be61"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)