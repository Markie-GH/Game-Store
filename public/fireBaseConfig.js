// Firebase config file (must import Firebase SDK to use the functions)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config (make sure to replace with your Firebase credentials)
const firebaseConfig = {
  apiKey: "eec4ab94c24d453fab811341d8f88fa7",
  authDomain: "game-store-8c3d3.firebaseapp.com",
  projectId: "game-store-8c3d3",
  storageBucket: "game-store-8c3d3.appspot.com",
  messagingSenderId: "336531520883",
  appId: "1:1234567890:web:abcdef123456",
  
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };  // Export the auth object
  
  // Add a comment
  await addDoc(collection(db, "comments"), {
    author: "Alice",
    text: "Nice game!",
    timestamp: new Date()
  });
  
export default firebaseConfig