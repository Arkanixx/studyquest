'use client';  // Marking this component as a Client Component

import React, { useEffect } from 'react';
import Link from 'next/link'; // Import Link for navigation

export default function Home() {
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
        <Link href="/" style={styles.navLink}>Auth</Link>
        <Link href="/" style={styles.navLink}>Friends</Link>
        <Link href="/" style={styles.navLink}>Friend Requests</Link>
        <Link href="/" style={styles.navLink}>Posts</Link>
        <Link href="/" style={styles.navLink}>Add Friends</Link>
        <Link href="/" style={styles.navLink}>Rooms</Link>
        <Link href="/DailyPlanner" style={styles.navLink}>Task Manager</Link>
        <Link href="/profile" style={styles.navLink}>Profile</Link>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroText}>Embark on Your Learning Journey</h2>
          <p style={styles.heroSubText}>Unlock endless knowledge, forge your path, and conquer new academic realms.</p>
          <Link href="/courses" style={styles.ctaButton}>Start Quest</Link>
        </div>
      </section>

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
        <Link href="/signup" style={styles.ctaButton}>Join the Quest</Link>
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
};