"use client"
import Link from 'next/link';

import { db } from "../firebase.js"
import CreateRoom from './CreateRoom.js';
import RoomsList from './RoomsList.js';

// Import the functions you need from the SDKs you need
import { collection, addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";



export default function Rooms() {
    
    return (
        <>
        <main>

        <h1>YOUR IN ROOMS</h1>
        <Link href="/">Home</Link>

        <div style={{ padding: "20px" }}>
            <CreateRoom />
        </div>
        
        <div style={{ padding: "20px" }}>
            <RoomsList />
        </div>

        </main>
        </>
    )
}
