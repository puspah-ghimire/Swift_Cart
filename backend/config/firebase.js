import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfsHM5n3sP9zr-KQJrAIkTMNuvXpK_q04",
  authDomain: "swift-cart-11143.firebaseapp.com",
  databaseURL: "https://swift-cart-11143-default-rtdb.firebaseio.com",
  projectId: "swift-cart-11143",
  storageBucket: "swift-cart-11143.appspot.com",
  messagingSenderId: "1071863107453",
  appId: "1:1071863107453:web:136b4a0f189ffb99328614",
  measurementId: "G-9FK378K0JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;