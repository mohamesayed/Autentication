import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR8l6Pg7hscJwfJN__in0A6HJq8rzzESE",
  authDomain: "auth-141f0.firebaseapp.com",
  projectId: "auth-141f0",
  storageBucket: "auth-141f0.firebasestorage.app",
  messagingSenderId: "967984413013",
  appId: "1:967984413013:web:a3d7a7d465a158c8bf17dc",
  measurementId: "G-7RNSJRRLXE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export modules
export { auth, googleProvider, facebookProvider };
export default auth; // ✅ يسمح بالاستيراد كـ `import auth from "../firebaseConfig";`
