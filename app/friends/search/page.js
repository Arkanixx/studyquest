"use client";
import React, { useState, useContext } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { UserContext } from "../../context/userContext";

export default function FriendSearchPage() {
    const [searchUsername, setSearchUsername] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [message, setMessage] = useState("");
    const { user, loading } = useContext(UserContext);

    const searchUsers = async () => {
        setMessage("");
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("userName", "==", searchUsername));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setSearchResults([]);
                setMessage("No users found.");
                return;
            }

            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setSearchResults(results);
        } catch (err) {
            console.error("Error searching users:", err);
            setMessage("Error searching users.");
        }
    };

    const sendFriendRequest = async (targetUserId, targetUserName) => {
        if (!user) {
            setMessage("You must be signed in to send friend requests.");
            return;
        }

        try {
            // Fetch the current user's username
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                setMessage("Failed to retrieve your username.");
                return;
            }

            const senderName = userDoc.data().userName;

            // Reference the friendRequests subcollection
            const friendRequestsRef = collection(db, `users/${targetUserId}/friendRequests`);

            // Add a new document to the friendRequests subcollection
            await addDoc(friendRequestsRef, {
                senderId: user.uid,
                senderName: senderName,
                status: "pending",
                sentAt: new Date(),
            });

            setMessage(`Friend request sent to ${targetUserName}!`);
        } catch (err) {
            console.error("Error sending friend request:", err);
            setMessage("Failed to send friend request. Please try again.");
        }
    };

    return (
        <div>
            <h3>Search for Friends</h3>
            <input
                placeholder="Enter username"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
            />
            <button onClick={searchUsers}>Search</button>

            {message && <p>{message}</p>}

            {searchResults.length > 0 && (
                <div>
                    <h4>Search Results</h4>
                    <ul>
                        {searchResults.map((user) => (
                            <li key={user.id}>
                                {user.userName}
                                <button onClick={() => sendFriendRequest(user.id, user.userName)}>
                                    Add Friend
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
