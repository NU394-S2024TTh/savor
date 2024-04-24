// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDoLINOqE_H0oZYytPH7XK6bZh573qY_lY",
	authDomain: "savor-test1.firebaseapp.com",
	databaseURL: "https://savor-test1-default-rtdb.firebaseio.com",
	projectId: "savor-test1",
	storageBucket: "savor-test1.appspot.com",
	messagingSenderId: "148834844681",
	appId: "1:148834844681:web:3b81b976b4a8c68817b8d8",
	measurementId: "G-3H0ENVEQCZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
