"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

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
        <div>
            <h3>My Friends</h3>
            {loading ? (
                <p>Loading...</p>
            ) : friends.length > 0 ? (
                <ul>
                    {friends.map((friend) => (
                        <li key={friend.userId}>{friend.userName}</li>
                    ))}
                </ul>
            ) : (
                <p>No friends found.</p>
            )}
        </div>
    );
}
