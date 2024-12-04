import './globals.css';
import { UserProvider } from "./context/userContext";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <nav>
                        <a href="/">
                            <img
                                src="/logo.svg"
                                alt="Logo"
                                style={{
                                    height: "60px",
                                    marginRight: "10px",
                                    borderRadius: "5px", 
                                }}
                            />
                        </a>
                        <a href="/auth">Auth</a>
                        <a href="/friends">Friends</a>
                        <a href="/friends/requests">Friend Requests</a>
                        <a href="/friends/search">Add Friend</a>
                        <a href="/posts">Posts</a>
                    </nav>
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
