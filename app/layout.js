import './globals.css';
import { UserProvider } from "./context/userContext";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
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
            </body>
        </html>
    );
}
