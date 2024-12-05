import React from "react";
import Head from "next/head";
import "../styles/globals.css"; // Import global styles

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Global Head */}
      <Head>
        <title>StudyQuest - Unlock Your Potential</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="StudyQuest helps you achieve academic excellence with tailored resources and guidance." />
        <meta charSet="UTF-8" /> {/* Character encoding */}
        <link rel="icon" type="image/png" href="/favicon.png" /> {/* Favicon */}
      </Head>

      {/* Page Content */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
