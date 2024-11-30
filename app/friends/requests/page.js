"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { db } from "../../config/firebase";
import { collection, getDocs, deleteDoc, setDoc, doc } from "firebase/firestore";

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
                const senderRef = doc(db, `users/${senderId}/friends/${user.uid}`);
                const receiverRef = doc(db, `users/${user.uid}/friends/${senderId}`);
                await setDoc(senderRef, { userId: user.uid, userName: user.displayName });
                await setDoc(receiverRef, { userId: senderId, userName: senderId }); // Simplified
            }
            await deleteDoc(requestRef);
            setRequests(requests.filter((req) => req.id !== requestId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h3>Friend Requests</h3>
            {loading ? (
                <p>Loading...</p>
            ) : requests.length > 0 ? (
                <ul>
                    {requests.map((req) => (
                        <li key={req.id}>
                            {req.senderName}
                            <button onClick={() => handleRequest(req.id, req.senderId, "accept")}>Accept</button>
                            <button onClick={() => handleRequest(req.id, req.senderId, "reject")}>Reject</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No friend requests found.</p>
            )}
        </div>
    );
}
