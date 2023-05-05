import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDm8jbLwqURje1ekG9vq5S5ouLaICFAD7s",
    authDomain: "nytimes-d0705.firebaseapp.com",
    projectId: "nytimes-d0705",
    storageBucket: "nytimes-d0705.appspot.com",
    messagingSenderId: "7544760523",
    appId: "1:7544760523:web:135d7cfce6f5dc86ed534e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);