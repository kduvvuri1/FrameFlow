// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeZben3mWkzoi0TRn5etIPVtEU9rw9w2c",
  authDomain: "loginsignuptrial-fbf03.firebaseapp.com",
  projectId: "loginsignuptrial-fbf03",
  storageBucket: "loginsignuptrial-fbf03.firebasestorage.app",
  messagingSenderId: "1008616908145",
  appId: "1:1008616908145:web:0b1d67b5dfcf4315fd82d0",
  measurementId: "G-9RQPJ71RY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Firebase Storage
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider};