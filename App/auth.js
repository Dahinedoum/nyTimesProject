// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

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


const formElement = document.querySelector("#form");
const errorMessage = document.getElementById("error-message")
const logoutButtonElement = document.querySelector("#logOut-button");

if (formElement) {
    formElement.addEventListener("submit", async (e) => {
        e.preventDefault()

        const email = formElement["email"].value;
        const password = formElement["password"].value;

        await registerAuth(email, password);
        await logIn(email, password);
    })

}



/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @return {Promise<void>}
 */




async function registerAuth(email, password) {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log(credentials);
        window.location.replace("../src/books.html");


    } catch (error) {
        errorMessage.innerHTML = `<p class="error">${error.message}</p>`;
    }

}

async function logIn(email, password) {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(credentials);

        window.location.replace("../src/books.html");

    } catch (error) {
        errorMessage.innerHTML = `<p class="error">${error.message}</p>`;
    }

}

onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname;
    console.log({ currentPath })

    if (user) {
        if ("../src/index.html".includes(currentPath)) {
            window.location.replace("../src/books.html");
        }

    } else {
        window.location.replace("../src/logIn.html")
    }
})

if (logoutButtonElement) {
    logoutButtonElement.addEventListener('click', async () => {
        try {
            await signOut(auth)

        } catch (error) {
            errorMessage.innerHTML = `<p class="error">${error.message}</p>`;
        }

        console.log(logoutButtonElement)


    });
}