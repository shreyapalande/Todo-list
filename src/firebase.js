// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM586ff5lefhyZ1rfAtfAxRudS_xfWZEk",
  authDomain: "todo-list-9a6df.firebaseapp.com",
  databaseURL: "https://todo-list-9a6df-default-rtdb.firebaseio.com",
  projectId: "todo-list-9a6df",
  storageBucket: "todo-list-9a6df.appspot.com",
  messagingSenderId: "60373520222",
  appId: "1:60373520222:web:0ca80367975c8c77d589cf",
  measurementId: "G-WSLS8QJJKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
