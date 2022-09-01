// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDf87tqCyw5NZqLSto72Uo3ZZ9_mJygK5o",
    authDomain: "admin-panel-375ea.firebaseapp.com",
    projectId: "admin-panel-375ea",
    storageBucket: "admin-panel-375ea.appspot.com",
    messagingSenderId: "308710625818",
    appId: "1:308710625818:web:80e0a5e93c1e6d06e4f7a3",
    measurementId: "G-P18ZM9WPP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);