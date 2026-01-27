import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCZdp-mfMX8BHu1Wv2BvQVVJVT9E6TT7E",
    authDomain: "verygood-d36c5.firebaseapp.com",
    projectId: "verygood-d36c5",
    storageBucket: "verygood-d36c5.firebasestorage.app",
    messagingSenderId: "789302109242",
    appId: "1:789302109242:web:9c466ca4c5cabba1cdc103",
    measurementId: "G-H6HKSZYN39"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
