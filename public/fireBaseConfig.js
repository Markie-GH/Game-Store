// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//  Fixed Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC_Uw3e88dd7RWOvIC8l2cvztWC1L9J8Cg",
  authDomain: "game-store-8c3d3.firebaseapp.com",
  projectId: "game-store-8c3d3",
  storageBucket: "game-store-8c3d3.appspot.com", //  FIXED HERE
  messagingSenderId: "336531520883",
  appId: "1:336531520883:web:58e10b48e1d422e3079906",
  measurementId: "G-XBFCZZ418E"
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);

//  Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

//  Export what you need
export { auth, db, firebaseConfig };
