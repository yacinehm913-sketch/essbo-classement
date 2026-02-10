// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5jgwJC4I_Dn0DD8NY9WW5hppw5EPH5f4",
  authDomain: "essbo-classement.firebaseapp.com",
  projectId: "essbo-classement",
  storageBucket: "essbo-classement.firebasestorage.app",
  messagingSenderId: "1084995452735",
  appId: "1:1084995452735:web:776f433437043dd6499d8a",
  measurementId: "G-QR3BMTCF95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);