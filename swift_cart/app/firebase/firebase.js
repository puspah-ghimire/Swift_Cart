import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBZwdGU8DshX451ECQsKWXAZZouQUPs4ik",
    authDomain: "swift-cart-f3ef0.firebaseapp.com",
    projectId: "swift-cart-f3ef0",
    storageBucket: "swift-cart-f3ef0.appspot.com",
    messagingSenderId: "732540018556",
    appId: "1:732540018556:web:20c0a31041c28752010ef9",
    measurementId: "G-BHW35XHE6H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)