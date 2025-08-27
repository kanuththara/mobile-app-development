// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKqlSwiWRWr_W0Aw86KRlvk6gX7unIb0Y",
  authDomain: "mobile-app-development-3e884.firebaseapp.com",
  projectId: "mobile-app-development-3e884",
  storageBucket: "mobile-app-development-3e884.firebasestorage.app",
  messagingSenderId: "832813235278",
  appId: "1:832813235278:web:1d1d9c997d670cb2c2571f",
  measurementId: "G-ST4MFZYH3X"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db };