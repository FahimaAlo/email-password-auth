// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtjcwZRmENZU5OpHtlNltjZVisP9VMGw0",
  authDomain: "email-password-auth-c18fc.firebaseapp.com",
  projectId: "email-password-auth-c18fc",
  storageBucket: "email-password-auth-c18fc.firebasestorage.app",
  messagingSenderId: "330577092781",
  appId: "1:330577092781:web:254d81902bb9f92fbda624"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;