"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./Friend.module.css";

export default function FriendsPage() {
    const { user, loading } = useContext(UserContext);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (!loading && user) {
            const fetchFriends = async () => {
                const friendsRef = collection(db, `users/${user.uid}/friends`);
                const snapshot = await getDocs(friendsRef);
                setFriends(snapshot.docs.map((doc) => doc.data()));
            };
            fetchFriends();
        }
    }, [user, loading]);

    return (
        <div className={styles.container}>
            <h3 className={styles.header}>My Friends</h3>
            {loading ? (
                <p>Loading...</p>
            ) : friends.length > 0 ? (
                <ul className={styles.list}>
                    {friends.map((friend) => (
                        <li key={friend.userId} className={styles.listItem}>
                            {friend.userName}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.empty}>No friends found.</p>
            )}
        </div>
    );
}
