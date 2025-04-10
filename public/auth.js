// Import Firebase modules
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
    getFirestore,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Initialize Firebase Authentication and Firestore
const auth = getAuth();
const db = getFirestore();

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    const signUpButton = document.querySelector('button[onclick="toggleForm(\'signUpModal\')"]');
    const loginButton = document.querySelector('button[onclick="toggleForm(\'loginModal\')"]');
    const signOutButton = document.getElementById('signOutBtn');

    if (user) {
        // User is logged in
        signUpButton.style.display = 'none';
        loginButton.style.display = 'none';
        signOutButton.style.display = 'inline-block'; // Show the "Sign Out" button
    } else {
        // No user is logged in
        signUpButton.style.display = 'inline-block';
        loginButton.style.display = 'inline-block';
        signOutButton.style.display = 'none'; // Hide the "Sign Out" button
    }
});

// Sign up function
function signUpUser() {
    const username = document.getElementById("signUpUsername").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store the username and email in Firestore
            setDoc(doc(db, "users", user.uid), {
                username: username,
                email: user.email
            })
            .then(() => {
                alert(`Welcome ${username}`);
                document.getElementById("signUpModal").style.display = "none";
            })
            .catch((error) => {
                alert("Error saving user info to Firestore: " + error.message);
            });
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Login function
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`Welcome back, ${user.email}`);
            document.getElementById("loginModal").style.display = "none";
            document.getElementById("signOutBtn").style.display = "inline-block";
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Sign out function
function signOutUser() {
    signOut(auth)
        .then(() => {
            alert("Signed out successfully");
            document.getElementById("signOutBtn").style.display = "none";
            window.location.href = "HomePage.html";

        })
        .catch((error) => {
            alert("Error signing out: " + error.message);
        });
}
document.getElementById('secretRoomBtn').addEventListener('click', function (event) {
    const auth = getAuth();  // Get the Firebase Authentication instance

    // Check if the user is logged in using Firebase Authentication
    if (!auth.currentUser) {
        event.preventDefault();  // Prevent navigation to Secret Room page
        alert('You need to log in first to access the Secret Room!');
    }
});


// Add event listener for the sign-out button
document.getElementById("signOutBtn").addEventListener("click", signOutUser);

// Make functions available to HTML buttons
window.signUpUser = signUpUser;
window.loginUser = loginUser;
