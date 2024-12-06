'use client'; // Required for components with state/hooks in app directory

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // New Next.js app router
import CreateRoom from "./CreateRoom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await getDocs(collection(db, "rooms"));
        const fetchedRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(fetchedRooms);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };

    fetchRooms();
  }, []);

  const joinRoom = (roomId) => {
    router.push(`/rooms/${roomId}`); // Navigate to the individual room page
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
        <h1>Available Rooms</h1>
            {rooms.length > 0 ? (
            <ul>
            {rooms.map((room) => (
                <li key={room.id}>
                    <h2>{room.roomName}</h2>
                    <p>Topic: {room.roomTopic}</p>
                    <button onClick={() => joinRoom(room.id)}>Join Room</button>
                </li>
            ))}
            </ul>
            ) : (
                <p>No rooms available. Create one!</p>
            )}
        
            <CreateRoom />
        </div>
    </main>
  );
}

