// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdFopLtnsy3XVF6wcUTRyFRso3S4BC4t4",
  authDomain: "movie-poster-website.firebaseapp.com",
  projectId: "movie-poster-website",
  storageBucket: "movie-poster-website.firebasestorage.app",
  messagingSenderId: "183195082465",
  appId: "1:183195082465:web:35b7ba481f76defc2461a0",
  measurementId: "G-G48BSY03MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();