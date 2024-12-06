"use client"
import {Box, Modal, Typography, Stack, TextField, Button} from '@mui/material';
import { useEffect, useState, useRef } from "react";
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

  useEffect(() => {
    const navLinks = document.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        link.style.color = '#88aadd'; // 
      });
      link.addEventListener('mouseleave', () => {
        link.style.color = ''; // Reset color
      });
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener('mouseenter', () => {});
        link.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

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

  // const { data: session } = useSession();
  // const handleSignIn = () => {
  //   signIn("google", { callbackUrl: "/dashboard" });
  // };

  useEffect(() => {
    const navLinks = document.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        link.style.color = '#88aadd'; // 
      });
      link.addEventListener('mouseleave', () => {
        link.style.color = ''; // Reset color
      });
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener('mouseenter', () => {});
        link.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
     
  return (
    <div>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>StudyQuest</h1>
        <p style={styles.headerSubtitle}>Your adventure in knowledge begins here.</p>
      </header>

      {/* Navbar */}
      <nav style={styles.nav}>
        <Link href="/auth" style={styles.navLink}>Auth</Link>
        <Link href="/friends" style={styles.navLink}>Friends</Link>
        <Link href="/friends/requests" style={styles.navLink}>Friend Requests</Link>
        <Link href="/posts" style={styles.navLink}>Posts</Link>
        <Link href="/friends/search" style={styles.navLink}>Add Friends</Link>
        <Link href="/rooms" style={styles.navLink}>Rooms</Link>
        <Link href="/DailyPlanner" style={styles.navLink}>Task Manager</Link>
        <Link href="/profile" style={styles.navLink}>Profile</Link>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroText}>Embark on Your Learning Journey</h2>
          <p style={styles.heroSubText}>Unlock endless knowledge, forge your path, and conquer new academic realms.</p>
          <Link href="/auth" style={styles.ctaButton}>Start Quest</Link>
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

      {/* About StudyQuest Section */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          <h2 style={styles.sectionTitle}>What is StudyQuest?</h2>
          <p style={styles.sectionDescription}>
            StudyQuest is a powerful portal where adventurers like you can discover courses in magic (and the sciences!), crafting (and business!), and much more to elevate your skills.
          </p>
        </div>
      </section>

      {/* Course Categories Section */}
      <section style={styles.categoriesSection}>
        <h2 style={styles.sectionTitle}>Choose Your Path</h2>
        <div style={styles.categoriesContainer}>
          <div style={styles.categoryCard}>
            <h3 style={styles.categoryTitle}>Science</h3>
            <p style={styles.categoryDescription}>From Chemistry to Astronomy, conquer the mysteries of the universe.</p>
          </div>
          <div style={styles.categoryCard}>
            <h3 style={styles.categoryTitle}>Technology</h3>
            <p style={styles.categoryDescription}>Master the art of coding, AI, and becoming a digital wizard.</p>
          </div>
          <div style={styles.categoryCard}>
            <h3 style={styles.categoryTitle}>Business</h3>
            <p style={styles.categoryDescription}>Lead your guilds with wisdom in entrepreneurship and management.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={styles.testimonialsSection}>
        <h2 style={styles.sectionTitle}>Tales from Fellow Adventurers</h2>
        <div style={styles.testimonialsContainer}>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>“StudyQuest gave me the skills I needed to face the toughest challenges. I feel more powerful than ever!”</p>
            <h4 style={styles.testimonialAuthor}>Lara, Sorceress of Business</h4>
          </div>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>“I learned magic (coding) and now I’m crafting amazing websites! This is my new world.”</p>
            <h4 style={styles.testimonialAuthor}>Aiden, Wizard of Web</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Begin Your Quest?</h2>
        <Link href="/auth" style={styles.ctaButton}>Join the Quest</Link>
      </section>



      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 StudyQuest. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Inline Styles
const styles = {
  header: {
    background: '#2a2b4d', // Deep blue background
    color: '#d1e0f0', // Light cool blue text
    padding: '80px 20px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    borderBottom: '2px solid #88aadd', // Light Blue border
  },
  headerTitle: {
    fontSize: '4rem',
    fontWeight: '700',
    margin: '0',
    textTransform: 'uppercase',
    textShadow: '0 0 10px #88aadd',
  },
  headerSubtitle: {
    fontSize: '1.5rem',
    fontWeight: '300',
    marginTop: '10px',
    color: '#fff',
    fontStyle: 'italic',
  },
  nav: {
    backgroundColor: '#3a3f60', // Darker blue background for nav
    padding: '20px',
    textAlign: 'center',
    borderBottom: '2px solid #88aadd',
  },
  navLink: {
    color: '#fff',
    padding: '14px 20px',
    margin: '0 10px',
    fontSize: '1.1rem',
    textDecoration: 'none',
    transition: 'color 0.3s ease, transform 0.3s ease',
    fontFamily: 'serif',
  },
  hero: {
    backgroundColor: '#1a1e30', // Dark background with slight blue tint
    color: '#fff', // White text for contrast
    height: '70vh', // Adjusted for good size on larger screens
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px', // Added padding to prevent text from being too close to edges
    fontSize: '2rem', // Default font size
    textShadow: '0 0 20px rgba(0, 0, 0, 0.5)', // Subtle shadow for better text contrast
    boxSizing: 'border-box', // Padding doesn't cause overflow
  },
  heroContent: {
    maxWidth: '800px', // Limit the width of the content to prevent text from stretching too wide
    padding: '20px',
  },
  heroText: {
    fontSize: '3rem', // Increased size for the main heading
    fontWeight: '700',
    margin: '0 0 20px 0', // Added margin below the heading
    textTransform: 'uppercase',
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
  aboutSection: {
    padding: '60px 20px',
    background: '#f4f8ff', // Very light blue background
    textAlign: 'center',
    borderTop: '4px solid #88aadd', // Blue border
  },
  aboutContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '20px',
    textTransform: 'uppercase',
    fontFamily: 'serif',
    color: '#1a1e30', // Dark text for titles
  },
  sectionDescription: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#444',
    marginBottom: '40px',
    fontStyle: 'italic',
  },
  categoriesSection: {
    background: '#2a2b4d', // Dark blue background
    color: '#fff',
    padding: '60px 20px',
    textAlign: 'center',
  },
  categoriesContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  categoryCard: {
    background: '#3b446d', // Slightly lighter dark blue background for cards
    border: '1px solid #88aadd',
    borderRadius: '8px',
    padding: '20px',
    width: '250px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease',
  },
  categoryTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '10px',
  },
  categoryDescription: {
    fontSize: '1.1rem',
    color: '#bbb',
    lineHeight: '1.5',
  },
  testimonialsSection: {
    background: '#2a2b4d', // Deep blue for testimonials section
    color: '#d1e0f0',
    padding: '60px 20px',
    textAlign: 'center',
  },
  testimonialsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  },
  testimonialCard: {
    background: '#3b446d', // Dark blue background for testimonial cards
    border: '2px solid #88aadd',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    marginBottom: '20px',
  },
  testimonialText: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    color: '#ddd',
    marginBottom: '20px',
  },
  testimonialAuthor: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  ctaSection: {
    background: '#88aadd',
    color: '#1a1e30',
    padding: '60px 20px',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '20px',
  },
  footer: {
    background: '#3a3f60',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
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