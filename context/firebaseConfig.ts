import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBnjfWdlAJwlgoJO9Da0qb91TR69uRTBrA",
    authDomain: "outfitly-ad582.firebaseapp.com",
    projectId: "outfitly-ad582",
    storageBucket: "outfitly-ad582.appspot.com",
    messagingSenderId: "309049697065",
    appId: "1:309049697065:web:c7b4b6c8fc8e5f1256cd38",
    measurementId: "G-L88CYP7RGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: Platform.OS == 'web' ? browserSessionPersistence : getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);