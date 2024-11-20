import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const CreateRoom = () => {
    const [roomName, setName] = useState("");
    const [roomTopic, setTopic] = useState("");
    const [creator, setCreator] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!roomName || !roomTopic || !creator) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "rooms"), {
                roomName,
                roomTopic,
                creator,
                createdAt: serverTimestamp(),
            });
            alert(`Chat room created with ID: ${docRef.id}`);
        } catch (error) {
            console.error("Error creating chat room: ", error);
            alert("Failed to create chat room.");
        }

        setName("");
        setTopic("");
        setCreator("");
    };

    return (
        
        <form onSubmit={handleSubmit}>
            <h2>Create a Room</h2>
            <div style={{padding: "5px"}}>
                <label>Room Name:</label>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter room name"
                />
            </div>
            <div style={{padding: "5px"}}>
                <label>Room Topic:</label>
                <input
                    type="text"
                    value={roomTopic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter room topic"
                />
            </div>
            <div style={{padding: "5px"}}>
                <label>Creator Name:</label>
                <input
                    type="text"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    placeholder="Enter your username"
                />
            </div>
            <div style={{padding: "5px 5px 5px 20px"}}>
                <button type="submit">Create Room</button>
            </div> 
        </form>
    );
};

export default CreateRoom;