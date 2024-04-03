// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmDSB9YdqFKiu-CtfmPDhGmyJOdi9viB8",
  authDomain: "savor-4dedb.firebaseapp.com",
  databaseURL: "https://savor-4dedb-default-rtdb.firebaseio.com",
  projectId: "savor-4dedb",
  storageBucket: "savor-4dedb.appspot.com",
  messagingSenderId: "6003583577",
  appId: "1:6003583577:web:fc854a328fc6800a379f48",
  measurementId: "G-FCM14JSJCN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);