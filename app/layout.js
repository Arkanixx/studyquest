import './globals.css';
import { UserProvider } from "./context/userContext";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <nav>
                    <a href="/">Home</a>
                    <a href="/auth">Auth</a>
                    <a href="/friends">Friends</a>
                    <a href="/friends/requests">Friend Requests</a>
                    <a href="/friends/search">Add Friend</a> {/* Added link */}
                    <a href="/posts">Posts</a>
                    </nav>
                    {children}
                </UserProvider>
            </body>
        </html>
    );
}
