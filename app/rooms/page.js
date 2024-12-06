'use client'; // Required for components with state/hooks in app directory

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // New Next.js app router
import CreateRoom from "./CreateRoom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import styles from "./Room.module.css"

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
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Available Rooms</h1>
        
        {rooms.length > 0 ? (
        <ul className={styles.roomList}>
        {rooms.map((room) => (
                <li key={room.id} className={styles.roomItem}>
                    <h3>{room.roomName}</h3>
                    <p>Topic: {room.roomTopic}</p>
                    <button className={styles.roomsButton} onClick={() => joinRoom(room.id)}>Join Room</button>
                </li>
            ))}
            </ul>
            ) : (
                <p>No rooms available. Create one!</p>
            )}
        </header> 
            <CreateRoom />
          
        </div>
    </main>
  );
}

