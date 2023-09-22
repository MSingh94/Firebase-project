// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"

// for AUTH 

import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtW9THuxerYs5n1pqbu8vjp1e2fWy1YtY",
  authDomain: "fir-blog-app-80f3a.firebaseapp.com",
  projectId: "fir-blog-app-80f3a",
  storageBucket: "fir-blog-app-80f3a.appspot.com",
  messagingSenderId: "1095526180561",
  appId: "1:1095526180561:web:cd741cd05954a5477007f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//setup database and export it
export const db = getFirestore(app)

// setup auth and export it

export const auth = getAuth(app)