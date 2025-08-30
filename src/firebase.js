// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";

// Your Firebase configuration
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

console.log("firebase Connected:", app);

// ✅ Export everything just once
export { db, doc, deleteDoc, updateDoc };
