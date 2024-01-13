// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBRTU-7U5c6Zy0xt7QKjX0UGarvv0a6nuE",
    authDomain: "grocery-store-auth-team126.firebaseapp.com",
    projectId: "grocery-store-auth-team126",
    storageBucket: "grocery-store-auth-team126.appspot.com",
    messagingSenderId: "778265525896",
    appId: "1:778265525896:web:67588982dcfba9f08a693d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const loggedIn = true;
            const name=result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;

            localStorage.setItem("loggedIn", loggedIn);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("profilePic", profilePic);

            window.location.reload();

            console.log(result)
        })
        .catch((error) => {
            console.log(error);
        })
}
