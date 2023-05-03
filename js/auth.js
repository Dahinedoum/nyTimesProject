import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { auth } from '/nyTimesProject/js/firebase.js'

const formElement = document.querySelector("#form");
const errorMessage = document.getElementById("error-message")
const logoutButtonElement = document.querySelector(".logout");

if (logoutButtonElement) {
    logoutButtonElement.addEventListener('click', async () => {
        try {
            await signOut(auth)

        } catch (error) {
            errorMessage.innerHTML = `<p class="error">${error.message}</p>`;
        }
    });
}

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
        window.location.replace("/nyTimesProject/views/books.html");


    } catch (error) {
        errorMessage.innerHTML = `<p class="error">${error.message}</p>`;
    }

}

async function logIn(email, password) {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(credentials);
        window.location.replace("/nyTimesProject/views/books.html");
    } catch (error) {
        errorMessage.innerHTML = `<p class="error">${error.message}</p>`;
    }

}

const loggedUrls = ['/nyTimesProject/views/books.html']
const publicUrls = ['/nyTimesProject/index.html', '/nyTimesProject/views/login.html', '/nyTimesProject/views/signup.html']

onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname;
    console.log({ currentPath, user })

    if (user) {
        if (publicUrls.includes(currentPath)) {
            window.location.replace("/nyTimesProject/views/books.html");
        }
    } else {
        if (loggedUrls.includes(currentPath)) {
           window.location.replace("/nyTimesProject/views/login.html");
        }
    }
})