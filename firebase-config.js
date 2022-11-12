// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3LtHxgPJvtkQ2ENidtRqSdpxZxy1FAxE",
  authDomain: "achack-69c93.firebaseapp.com",
  databaseURL: "https://achack-69c93-default-rtdb.firebaseio.com",
  projectId: "achack-69c93",
  storageBucket: "achack-69c93.appspot.com",
  messagingSenderId: "125538843764",
  appId: "1:125538843764:web:70d625ec810157159ce521"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);