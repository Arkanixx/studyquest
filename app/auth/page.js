"use client";
import styles from "./Auth.module.css";
import React, { useState } from "react";
import { auth, googleProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const isUsernameUnique = async (username) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userName", "==", username));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty;
    };

    const signUp = async () => {
        try {
            if (!await isUsernameUnique(username)) {
                alert("Username is already taken. Please choose another.");
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save the user in Firestore
            await setDoc(doc(db, "users", user.uid), {
                userId: user.uid,
                userName: username,
                email: user.email,
            });

            alert("Registration successful!");
        } catch (err) {
            console.error("Error during sign-up:", err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            alert("Signed in with Google!");
        } catch (err) {
            console.error(err);
        }
    };

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Sign-in successful!");
        } catch (err) {
            console.error(err);
            alert("Error signing in: " + err.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            alert("Signed out!");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <input className={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input className={styles.input} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <input className={styles.input}
                placeholder="Username (for sign-up)"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <button className={styles.button}onClick={signUp}>Sign Up</button>
            <button className={styles.button}onClick={signIn}>Sign In</button>
            <button className={styles.button}onClick={signInWithGoogle}>Sign In with Google</button>
            <button className={styles.button}onClick={logout}>Sign Out</button>
        </div>
    );
}
