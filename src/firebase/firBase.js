// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7UqmaHSq6Xd_wzEJ7OOEes4Bc9GSDgLQ",
  authDomain: "social-media-22ee1.firebaseapp.com",
  databaseURL: "https://social-media-22ee1-default-rtdb.firebaseio.com",
  projectId: "social-media-22ee1",
  storageBucket: "social-media-22ee1.appspot.com",
  messagingSenderId: "353796757369",
  appId: "1:353796757369:web:eff2225c3fab8e620bc1a8",
  measurementId: "G-3RLSQJL8JJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
