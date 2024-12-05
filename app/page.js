"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (chatMessages) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Error in sendMessage:", error);
      throw error;
    }
  };

  const toggleChat = () => {
    if (!isChatOpen && messages.length === 0) {
      setMessages([{ role: "bot", content: "Hi there! How can I help you today?" }]);
    }
    setChatOpen(!isChatOpen);
    setTimeout(() => {
      if (!isChatOpen && chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    try {
      const botResponse = await sendMessage([...messages, userMessage]);
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error connecting to AI. Please try again later." },
      ]);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>StudyQuest</h1>
        <p style={styles.headerSubtitle}>Your adventure in knowledge begins here.</p>
      </header>

      {/* Navbar */}
      <nav style={styles.nav}>
        <Link href="/" style={styles.navLink}>
          Auth
        </Link>
        <Link href="/" style={styles.navLink}>
          Friends
        </Link>
        <Link href="/" style={styles.navLink}>
          Friend Requests
        </Link>
        <Link href="/" style={styles.navLink}>
          Posts
        </Link>
        <Link href="/" style={styles.navLink}>
          Add Friends
        </Link>
        <Link href="/" style={styles.navLink}>
          Rooms
        </Link>
        <Link href="/" style={styles.navLink}>
        Task Manager
        </Link>
        <Link href="/profile" style={styles.navLink}>
          Profile
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroText}>Embark on Your Learning Journey</h2>
          <p style={styles.heroSubText}>
            Unlock endless knowledge, forge your path, and conquer new academic realms.
          </p>
          <Link href="/courses" style={styles.ctaButton}>
            Start Quest
          </Link>
        </div>
      </section>

      {/* Chatbot */}
      <div style={styles.chatbot}>
        <div style={styles.chatIcon} onClick={toggleChat}>
          💬
        </div>
        {isChatOpen && (
          <div style={styles.chatWindow}>
            <div style={styles.chatHeader}>
              <span>Speak with the Quest Master</span>
              <button style={styles.closeButton} onClick={toggleChat}>
                ✖️
              </button>
            </div>
            <div style={styles.chatMessages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.chatMessage,
                    ...(msg.role === "user" ? styles.userMessage : styles.botMessage),
                  }}
                >
                  {msg.role === "bot"
                    ? msg.content.split("\n").map((line, i) => (
                        <p key={i} style={{ margin: 0 }}>
                          {line}
                        </p>
                      ))
                    : msg.content}
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>
            <div style={styles.chatInput}>
              <input
                type="text"
                placeholder="Type a message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                style={styles.inputBox}
              />
              <button onClick={handleSendMessage} style={styles.sendButton}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Styles (merged styles explicitly)
const styles = {
  header: {
    background: "#2a2b4d",
    color: "#d1e0f0",
    padding: "80px 20px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    borderBottom: "2px solid #88aadd",
  },
  headerTitle: {
    fontSize: "4rem",
    fontWeight: "700",
    margin: "0",
    textTransform: "uppercase",
    textShadow: "0 0 10px #88aadd",
  },
  headerSubtitle: {
    fontSize: "1.5rem",
    fontWeight: "300",
    marginTop: "10px",
    color: "#fff",
    fontStyle: "italic",
  },
  nav: {
    backgroundColor: "#3a3f60",
    padding: "20px",
    textAlign: "center",
    borderBottom: "2px solid #88aadd",
  },
  navLink: {
    color: "#fff",
    padding: "14px 20px",
    margin: "0 10px",
    fontSize: "1.1rem",
    textDecoration: "none",
  },
  hero: {
    backgroundColor: "#1a1e30",
    color: "#fff",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  heroContent: {
    maxWidth: "800px",
  },
  heroText: {
    fontSize: "3rem",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  heroSubText: {
    fontSize: '1.5rem', // Slightly smaller subheading
    margin: '20px 0', // Added margin for spacing
    fontWeight: '300',
    lineHeight: '1.6', // Adjusted line height for better spacing between lines
    fontStyle: 'italic',
  },

  ctaButton: {
    backgroundColor: '#88aadd', // Soft blue button
    color: '#1a1e30', // Dark background for button text
    padding: '12px 30px',
    textDecoration: 'none',
    fontSize: '1.2rem',
    borderRadius: '30px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },

  chatbot: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
  chatIcon: {
    width: "60px",
    height: "60px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  chatWindow: {
    width: '90%',
    maxWidth: '400px',
    height: '70%',
    maxHeight: '600px',
    backgroundColor: '#ffffff',
    backgroundSize: 'cover', // Ensures the image covers the entire chat window
    backgroundRepeat: 'no-repeat', // Avoids repeating the image
    backgroundPosition: 'center', // Centers the image
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
  chatHeader: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    fontSize: '1rem',
    textAlign: 'center',
    position: 'relative', // Required for absolute positioning of the button
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
  },
  chatMessages: {
    flex: 1,
    padding: '10px',
    boxSizing: 'border-box',
    overflowY: 'auto', // Enables scrolling for long messages
    backgroundImage: 'url("/images/pixelated-background.png")', // Apply background to messages only
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  chatMessage: {
    margin: '10px 0',
    padding: '10px 15px',
    borderRadius: '20px', // Rounded corners
    maxWidth: '70%', // Prevent bubbles from stretching too wide
    width: 'fit-content',
    wordBreak: 'break-word', // Break long words
    fontSize: '0.95rem',
    lineHeight: '1.4',
  },
  userMessage: {
    backgroundColor: '#007bff', // Blue background for user messages
    color: 'white', // White text
    alignSelf: 'flex-end', // Align to the right
    borderBottomRightRadius: '0',
    margin: '0 0 5px auto',
  },
  botMessage: {
    backgroundColor: '#f1f1f1', // Light gray background for bot messages
    color: '#333', // Dark text
    alignSelf: 'flex-start', // Align to the left
    borderBottomLeftRadius: '0',
  },
  chatInput: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
  },
  chatInputContainer: {
    display: 'flex',
    gap: '10px', // Adds space between input and button
    padding: '10px',
    backgroundColor: '#ffffff', // Solid white background for input area
    borderTop: '1px solid #ddd',
  },
  inputBox: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  },
  sendButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    marginLeft: '5px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  closeButton: {
    backgroundColor: '#ff4d4f', // Red background
    color: 'white', // White text
    border: 'none',
    borderRadius: '50%', // Circle shape
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'absolute', // Position it within the header
    top: '8px',
    right: '10px', // Place it at the top-right
    fontSize: '14px',
  },

};
