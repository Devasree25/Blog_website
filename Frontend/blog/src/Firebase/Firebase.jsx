// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg-mm5zs0IuW59WiRP-dbQFGtiifVLfUw",
  authDomain: "blog-4dc9a.firebaseapp.com",
  projectId: "blog-4dc9a",
  storageBucket: "blog-4dc9a.firebasestorage.app",
  messagingSenderId: "683108907787",
  appId: "1:683108907787:web:f9044ddcd46022ac21400e",
  measurementId: "G-FESRK6XYN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); 