// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd1uFD9Dp8Tj0rHle1LNAdFBqNA4gUrHE",
  authDomain: "studyquest-4a13d.firebaseapp.com",
  projectId: "studyquest-4a13d",
  storageBucket: "studyquest-4a13d.firebasestorage.app",
  messagingSenderId: "806680012195",
  appId: "1:806680012195:web:b96ab04693eb442ce8a616",
  measurementId: "G-6N8KPR4DMT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore so it can be used in other files
export { db };
