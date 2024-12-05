"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { db } from "../../config/firebase";
import { collection, getDocs, deleteDoc, setDoc, doc, getDoc } from "firebase/firestore";
import styles from "./FriendRequests.module.css";

export default function FriendRequestsPage() {
    const { user, loading } = useContext(UserContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (!loading && user) {
            const fetchRequests = async () => {
                const requestsRef = collection(db, `users/${user.uid}/friendRequests`);
                const snapshot = await getDocs(requestsRef);
                setRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            };
            fetchRequests();
        }
    }, [user, loading]);

    const handleRequest = async (requestId, senderId, action) => {
        try {
            const requestRef = doc(db, `users/${user.uid}/friendRequests/${requestId}`);
    
            if (action === "accept") {
                // Fetch sender's data
                const senderDocRef = doc(db, "users", senderId);
                const senderDoc = await getDoc(senderDocRef);
    
                if (!senderDoc.exists()) {
                    throw new Error("Sender does not exist.");
                }
    
                const senderData = senderDoc.data();
    
                // Fetch receiver's data (current user)
                const receiverDocRef = doc(db, "users", user.uid);
                const receiverDoc = await getDoc(receiverDocRef);
    
                if (!receiverDoc.exists()) {
                    throw new Error("Receiver does not exist.");
                }
    
                const receiverData = receiverDoc.data();
    
                // Add sender to receiver's friends list
                const receiverFriendRef = doc(db, `users/${user.uid}/friends/${senderId}`);
                await setDoc(receiverFriendRef, {
                    userId: senderId,
                    userName: senderData.userName, // Use sender's username
                });
    
                // Add receiver to sender's friends list
                const senderFriendRef = doc(db, `users/${senderId}/friends/${user.uid}`);
                await setDoc(senderFriendRef, {
                    userId: user.uid,
                    userName: receiverData.userName || "Anonymous", // Use receiver's username or fallback
                });
            }
    
            // Remove the friend request
            await deleteDoc(requestRef);
            setRequests(requests.filter((req) => req.id !== requestId));
        } catch (err) {
            console.error("Error handling friend request:", err);
        }
    };

    return (
        <div className={styles.container}>
        <h3 className={styles.header}>Friend Requests</h3>
        {loading ? (
            <p>Loading...</p>
        ) : requests.length > 0 ? (
            <ul className={styles.list}>
                {requests.map((req) => (
                    <li key={req.id} className={styles.listItem}>
                        {req.senderName}
                        <div>
                            <button
                                className={styles.button}
                                onClick={() => handleRequest(req.id, req.senderId, "accept")}
                            >
                                Accept
                            </button>
                            <button
                                className={`${styles.button} ${styles.reject}`}
                                onClick={() => handleRequest(req.id, req.senderId, "reject")}
                            >
                                Reject
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className={styles.empty}>No friend requests found.</p>
        )}
    </div>
    );
}
