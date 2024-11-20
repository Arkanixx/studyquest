import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const RoomsList = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Collection reference
        const roomsCollection = collection(db, "rooms");

        // Listner for updates
        const unsubscribe = onSnapshot(roomsCollection, (snapshot) => {
            const rooms = snapshot.docs.map((doc) => ({
                id: doc.id, // Firestore document ID
                ...doc.data(),
            }));
            setRooms(rooms);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Available Rooms</h2>
            <p>"Room Name": "Room Topic"</p>
            {rooms.length > 0 ? (
                <ul>
                    {rooms.map((room) => (
                        <li key={room.id}>
                            <strong>{room.roomName}</strong>: {room.roomTopic}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No rooms available.</p>
            )}
        </div>
    );
};

export default RoomsList;