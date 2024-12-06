import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import styles from "./Room.module.css"

const CreateRoom = () => {
    const [roomName, setName] = useState("");
    const [roomTopic, setTopic] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!roomName || !roomTopic) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "rooms"), {
                roomName,
                roomTopic,
                createdAt: serverTimestamp(),
            });
            alert(`Chat room created with ID: ${docRef.id}`);
        } catch (error) {
            console.error("Error creating chat room: ", error);
            alert("Failed to create chat room.");
        }

        setName("");
        setTopic("");
    };

    return (
        
        <form onSubmit={handleSubmit}>
            <header className="styles.header">
                <h2>Create a Room</h2>
            </header>
            
                <label>Room Name:</label>
                <div className={styles.boxInput}>
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter room name"
                    />
                </div>
                <label>Room Topic:</label>
                <div className={styles.boxInput}>
                    <input
                        type="text"
                        value={roomTopic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter room topic"
                    />
                </div>

                <button className={styles.roomsButton} type="submit">Create Room</button>
        </form>
    );
};

export default CreateRoom;