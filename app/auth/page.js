"use client";
import styles from "./Auth.module.css";
import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User signed up!");
        } catch (err) {
            console.error(err);
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

    const logout = async () => {
        try {
            await signOut(auth);
            alert("Signed out!");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input className={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input className={styles.input} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button className={styles.button}onClick={signUp}>Sign Up</button>
            <button className={styles.button}onClick={signInWithGoogle}>Sign In with Google</button>
            <button className={styles.button}onClick={logout}>Sign Out</button>
        </div>
    );
}
