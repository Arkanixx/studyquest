// app/page.js
import React from 'react';
import Link from 'next/link'; // Import Link from Next.js for client-side navigation

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <h1>StudyQuest</h1>
        <p>Your guide to academic excellence</p>
      </header>

      {/* Navbar */}
      <nav style={styles.nav}>
        <Link href="/" style={styles.navLink}>Home</Link>
        <Link href="/about" style={styles.navLink}>About</Link>
        <Link href="/contact" style={styles.navLink}>Contact</Link>
        <Link href="/profile" style={styles.navLink}>Profile</Link> {/* New Profile Tab */}
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div>
          <h2>Start Your Journey to Academic Success</h2>
        </div>
      </section>

      {/* Content Section */}
      <div style={styles.content}>
        <h2>Featured Courses</h2>
        <div style={styles.card}>
          <img src="course1.jpg" alt="Course 1" style={styles.cardImage} />
          <h3>Course Title 1</h3>
          <p>Short description of the course.</p>
        </div>
        <div style={styles.card}>
          <img src="course2.jpg" alt="Course 2" style={styles.cardImage} />
          <h3>Course Title 2</h3>
          <p>Short description of the course.</p>
        </div>
        <div style={styles.card}>
          <img src="course3.jpg" alt="Course 3" style={styles.cardImage} />
          <h3>Course Title 3</h3>
          <p>Short description of the course.</p>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>&copy; 2024 StudyQuest. All rights reserved.</p>
      </div>
    </div>
  );
}

// Inline styles (you can also use CSS modules or styled-components)
const styles = {
  header: {
    background: '#333',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  nav: {
    backgroundColor: '#333',
    padding: '15px',
    textAlign: 'center',
  },
  navLink: {
    color: 'white',
    padding: '14px 20px',
    margin: '0 10px',
    fontSize: '1.1rem',
    textDecoration: 'none',
  },
  hero: {
    background: 'url("your-image-url.jpg") no-repeat center center/cover',
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    fontSize: '2rem',
  },
  content: {
    padding: '40px',
    background: 'white',
    textAlign: 'center',
  },
  card: {
    display: 'inline-block',
    width: '30%',
    margin: '20px',
    padding: '20px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  footer: {
    background: '#333',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
  },
};
