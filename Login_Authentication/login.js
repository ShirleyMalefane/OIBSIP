// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

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

// Get elements
const loginForm = document.getElementById('loginForm');

// Login event
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Login form submitted');

    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        console.log('Attempting to sign in...');
        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed in:', user);

        // Check if email is verified
        if (user.emailVerified) {
            console.log('Email is verified');
            window.location.href = 'secured.html'; // Redirect to secured page
        } else {
            console.log('Email is not verified');
            alert('Please verify your email before logging in.');
            auth.signOut();
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        alert(error.message);
    }
});
