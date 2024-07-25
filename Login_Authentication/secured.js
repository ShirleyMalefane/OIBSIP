// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzkFcCXn0dkYd54KKoeeDprrYhxVf3Xqo",
  authDomain: "login-authentication-35fe5.firebaseapp.com",
  projectId: "login-authentication-35fe5",
  storageBucket: "login-authentication-35fe5.appspot.com",
  messagingSenderId: "35847230134",
  appId: "1:35847230134:web:42bf1e25a0c0aeb95bcc17",
  measurementId: "G-C4GT6RZSMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if the user is authenticated
auth.onAuthStateChanged(user => {
    if (!user || !user.emailVerified) {
        // Redirect to login page if user is not authenticated or email is not verified
        window.location.href = 'login.html';
    }
});

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert('Logged out successfully!');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error during logout:', error.message);
    }
});
