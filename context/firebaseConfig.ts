import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkoWVWTDv2d_ze6FIBeNcrRQWgpTMxpWA",
    authDomain: "paceeffort-pro.firebaseapp.com",
    projectId: "paceeffort-pro",
    storageBucket: "paceeffort-pro.appspot.com",
    messagingSenderId: "531300426219",
    appId: "1:531300426219:web:22fb0692e3c56304fe39ae",
    measurementId: "G-F9LJ89HEC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: Platform.OS == 'web' ? browserSessionPersistence : getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

let analytics = null;
isSupported()
.then(res => {
    if (res){
        analytics = getAnalytics(app);
    }
})

export { analytics };