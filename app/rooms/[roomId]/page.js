'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // New Next.js app router hook
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function RoomPage() {
  const { roomId } = useParams(); // Get the room ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
    <div>
      <h2>Room: {roomId}</h2>
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
  );
}
