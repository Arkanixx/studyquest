'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // New Next.js app router hook
import { collection, doc, getDoc, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function RoomPage() {
  const { roomId } = useParams(); // Get the room ID from the URL
  const [roomName, setRoomName] = useState("");
  const [roomTopic, setRoomTopic] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!roomId) return;
  
    const fetchRoomDetails = async () => {
      const roomRef = doc(db, "rooms", roomId);
      const roomSnap = await getDoc(roomRef);
  
      if (roomSnap.exists()) {
        const roomData = roomSnap.data();
        setRoomName(roomData.roomName);
        setRoomTopic(roomData.roomTopic);
      } else {
        console.error("Room does not exist");
      }
    };
  
    fetchRoomDetails();
  }, [roomId]);
  
  // Fetch messages in the room
  useEffect(() => {
    if (!roomId) return;

    const messagesRef = collection(db, "rooms", roomId, "messages");
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        text: newMessage,
        createdAt: new Date().toISOString(),
      });
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <main>
                <nav>
            <a href="/">
                <img
                    src="/logo.svg"
                        alt="Logo"
                        style={{
                            height: "60px",
                            marginRight: "10px",
                            borderRadius: "5px", 
                        }}
                />
            </a>
            <a href="/auth">Auth</a>
            <a href="/friends">Friends</a>
            <a href="/friends/requests">Friend Requests</a>
            <a href="/friends/search">Posts</a>
            <a href="/friends/search">Add Friends</a>
            <a href="/rooms">Rooms</a>
            <a href="/friends/search">Task Manager</a>
            <a href="/posts">Profile</a>
        </nav>

        <div className="rooms">
      <h2>Room: "{roomName}" - Topic: "{roomTopic}"</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>


    </main>



  );
}
