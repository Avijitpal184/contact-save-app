// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: "contact-vite-firebase.firebaseapp.com",
  projectId: "contact-vite-firebase",
  storageBucket: "contact-vite-firebase.firebasestorage.app",
  messagingSenderId: "14243109795",
  appId: "1:14243109795:web:a93c7f4de68e978c0b1816",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


