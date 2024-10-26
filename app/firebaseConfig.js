// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCv9x-PVzEVLs-nnQP8tQUe6lpjYRJ4bNs",
    authDomain: "codinghub-1a9d4.firebaseapp.com",
    projectId: "codinghub-1a9d4",
    storageBucket: "codinghub-1a9d4.appspot.com",
    messagingSenderId: "861589710795",
    appId: "1:861589710795:web:a80bbad299d63745c3784e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };