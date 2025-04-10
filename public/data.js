// data.js
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase initialization
const db = getFirestore();

// Function to fetch comments for a particular game from Firestore
async function loadComments(gameId) {
    const commentContain = document.getElementById("commentContain");
    commentContain.innerHTML = ''; // Clear existing comments

    try {
        const querySnapshot = await getDocs(collection(db, "games", gameId.toString(), "comments"));
        querySnapshot.forEach((doc) => {
            const commentData = doc.data();
            const commentDiv = document.createElement("div");
            commentDiv.textContent = `${commentData.user}: ${commentData.text}`;
            commentContain.appendChild(commentDiv);
        });
    } catch (error) {
        console.error("Error getting comments: ", error);
    }
}

// Function to post a comment to Firestore
async function postComment(gameId, commentText) {
    const user = getAuth().currentUser;
    if (!user) {
        alert("You need to be logged in to post a comment.");
        return;
    }

    try {
        await addDoc(collection(db, "games", gameId.toString(), "comments"), {
            user: user.email,  // or user.displayName if available
            text: commentText,
            timestamp: new Date().toISOString()  // Use a simple timestamp
        });
        alert("Comment posted!");
        loadComments(gameId); // Reload comments after posting
    } catch (error) {
        console.error("Error posting comment: ", error);
    }
}
