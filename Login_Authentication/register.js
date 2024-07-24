// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Get elements
const registerForm = document.getElementById('registerForm');

// Register event
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Register form submitted');

    const name = document.getElementById('registerName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    // Validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        console.log('Password validation failed');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        console.log('Passwords do not match');
        return;
    }

    try {
        console.log('Attempting to create user...');
        // Register with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User registered:', user);

        console.log('Sending verification email...');
        const actionCodeSettings = {
            url: 'http://yourdomain.com/login.html', // Replace with your login page URL
            handleCodeInApp: true,
        };
        await sendEmailVerification(user, actionCodeSettings);
        console.log('Verification link sent via email');

        // Inform user to check their email
        alert('Registration successful! Please check your email to verify your account.');
        console.log('Registration successful! Please check your email to verify your account.');

        // Store user data in Firestore
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name: name,
            lastName: lastName,
            email: email
        });

        console.log('Redirecting to login page');
        window.location.href = 'login.html'; // Redirect to login page
    } catch (error) {
        console.error('Error during registration:', error.message);
        if (error.code === 'auth/email-already-in-use') {
            alert('The email address is already in use. Please use a different email.');
        } else {
            alert(error.message);
        }
    }
});
