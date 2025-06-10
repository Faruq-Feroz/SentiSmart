// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfacUKhek4-YpjCBWpUDKy8zMY7Nf6r6s",
  authDomain: "sentismart-644e5.firebaseapp.com",
  projectId: "sentismart-644e5",
  storageBucket: "sentismart-644e5.firebasestorage.app",
  messagingSenderId: "131141412279",
  appId: "1:131141412279:web:b44793afac5b2d2cb6b432"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const phoneProvider = new PhoneAuthProvider(auth);

export { auth, googleProvider, phoneProvider };
export default app;