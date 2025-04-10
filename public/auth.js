// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase initialization
const auth = getAuth();

// Sign Up user
function signUpUser() {
    const username = document.getElementById("signUpUsername").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`Welcome ${username}`);
            toggleForm('signUpModal'); // Close modal
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Login user
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`Welcome back, ${user.email}`);
            toggleForm('loginModal'); // Close modal
            document.getElementById("signOutBtn").style.display = "inline-block";
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Sign out user
function signOutUser() {
    signOut(auth)
        .then(() => {
            alert("Signed out successfully");
            document.getElementById("signOutBtn").style.display = "none";
        })
        .catch((error) => {
            alert("Error signing out: " + error.message);
        });
}

// Call this function when user clicks on sign out button
document.getElementById("signOutBtn").addEventListener("click", signOutUser);
