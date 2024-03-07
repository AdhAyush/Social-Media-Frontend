// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCP_2OaXTbIu8DkwRySgyuaeQkMKpnsOtY",
  authDomain: "cherrify-28029.firebaseapp.com",
  databaseURL: "https://cherrify-28029-default-rtdb.firebaseio.com",
  projectId: "cherrify-28029",
  storageBucket: "cherrify-28029.appspot.com",
  messagingSenderId: "543181306392",
  appId: "1:543181306392:web:1d929a46d5b2abcae3616d",
  measurementId: "G-FE4955W5EW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
