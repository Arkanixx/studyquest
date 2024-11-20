"use client"
//import {Box, Modal, Typography, Stack, TextField, Button} from '@mui/material';
//import styles from './page.module.css';
//import { useEffect, useState, useRef } from "react";
import Link from 'next/link';

export default function Home() {
  // START OLD??
  /*const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialMessage();
  }, []);

  useEffect(() => {
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages])

  const fetchInitialMessage = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ role: "system", content: "Initial message" }]),
      });
      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      console.error("Error fetching initial message:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ role: "user", content: input }]),
      });
      const data = await response.json();
      setMessages([...newMessages, data.data[data.data.length - 1]]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false)
    }
  };

  const resetChat = () => {
    setMessages([]);
    fetchInitialMessage();
  };

  // const { data: session } = useSession();
  // const handleSignIn = () => {
  //   signIn("google", { callbackUrl: "/dashboard" });
  // };
  */

  const test = () => {
    console.log("test done");
  }

  return (
    <>
    <main>

      <h1>Hello Dummy</h1>
      <Link href="/rooms">Rooms</Link>
      <Link href="/arena">Arena</Link>

      <button onClick={test}>Add to DB</button>

    </main>
    </>
  );


}