import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);