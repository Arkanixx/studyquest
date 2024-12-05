import './globals.css';
import { UserProvider } from "./context/userContext";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
            {/* <nav style={styles.nav}>
                <a href="/auth" style={styles.navLink}>Auth</a>
                <a href="/friends" style={styles.navLink}>Friends</a>
                <a href="/friends/requests" style={styles.navLink}>Friend Requests</a>
                <a href="/posts" style={styles.navLink}>Posts</a>
                <a href="/friends/search" style={styles.navLink}>Add Friends</a>
            </nav> */}
                <UserProvider>
                    <div
                        style={{
                            backgroundImage: "url('/rpg-background.gif')", // Corrected path
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            minHeight: "100vh", // Ensures full viewport height
                            width: "100%", // Ensures it spans full width
                        }}
                    >
                        {children} {/* Ensure content is inside the background */}
                    </div>
                </UserProvider>
            </body>
        </html>
    );
}

const styles = {
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
}
