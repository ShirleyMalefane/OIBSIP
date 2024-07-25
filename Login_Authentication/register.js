import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzkFcCXn0dkYd54KKoeeDprrYhxVf3Xqo",
  authDomain: "login-authentication-35fe5.firebaseapp.com",
  projectId: "login-authentication-35fe5",
  storageBucket: "login-authentication-35fe5.appspot.com",
  messagingSenderId: "35847230134",
  appId: "1:35847230134:web:42bf1e25a0c0aeb95bcc17",
  measurementId: "G-C4GT6RZSMQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const actionCodeSettings = {
            url: 'https://your-project-id.web.app/login.html', // Update this URL to your actual hosting URL
            handleCodeInApp: true,
        };
        await sendEmailVerification(user, actionCodeSettings);

        alert('Registration successful! Please check your email to verify your account.');
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name: name,
            lastName: lastName,
            email: email
        });

        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error during registration:', error.message);
        if (error.code === 'auth/email-already-in-use') {
            alert('The email address is already in use. Please use a different email.');
        } else {
            alert(error.message);
        }
    }
});
