import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

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

// Check if user is logged in and email is verified
onAuthStateChanged(auth, user => {
    if (user && user.emailVerified) {
        console.log('User is logged in and email is verified:', user);
    } else {
        console.log('User is not logged in or email is not verified');
        window.location.href = 'login.html'; // Redirect to login page
    }
});

// Logout button event
document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('User logged out');
        window.location.href = 'login.html'; // Redirect to login page
    }).catch((error) => {
        console.error('Error during logout:', error.message);
    });
});
