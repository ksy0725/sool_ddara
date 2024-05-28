// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuRpdEejStjcKpaODkwVWKEI-PLvg-Ehc",
  authDomain: "sool-ddara.firebaseapp.com",
  projectId: "sool-ddara",
  storageBucket: "sool-ddara.appspot.com",
  messagingSenderId: "1065635245377",
  appId: "1:1065635245377:web:6e947949cf765f6ca545c0",
  measurementId: "G-K7TWBZC549"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export { firebaseAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword };