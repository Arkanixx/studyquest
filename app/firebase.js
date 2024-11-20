// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-vWdubysfgmOWg40GHoxvhFx-G0RxApc",
    authDomain: "cap2test-41652.firebaseapp.com",
    projectId: "cap2test-41652",
    storageBucket: "cap2test-41652.firebasestorage.app",
    messagingSenderId: "560309716966",
    appId: "1:560309716966:web:c440f76b67edc6105c7827",
    measurementId: "G-YZ18PS27R6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };