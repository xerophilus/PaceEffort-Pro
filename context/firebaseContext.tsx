import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { isSupported, logEvent } from 'firebase/analytics';

import { auth, db, analytics } from './firebaseConfig';
import { Platform } from 'react-native';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  const register = async (email, password, name) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date(),
      });
      return {success: true, data: user}
    } catch (e) {
      console.error("Error registering user: ", e);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {success: true, data: response.user}
    } catch (e) {
      console.error("Error logging in: ", e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Error logging out: ", e);
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      console.error("Error sending password reset email: ", e);
    }
  };

  const savePushToken = async (userId, token) => {
    try {
      await setDoc(doc(db, 'users', userId), { pushToken: token }, { merge: true });
    } catch (e) {
      console.error('Error saving push token: ', e);
    }
  };

  const saveRunData = async (distance, time, speed, unit) => {
    try {
      await addDoc(collection(db, 'runs'), {
        distance,
        time,
        pace: speed,
        unit,
        timestamp: new Date(),
        userId: user.uid,
      });
    } catch (error) {
      console.error('Error saving run data: ', error);
    }
  };

  return (
    <FirebaseContext.Provider value={{
      user, habits, notifications,
      register, login, logout, forgotPassword,
      savePushToken, saveRunData
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
