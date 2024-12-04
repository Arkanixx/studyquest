"use client";
import styles from "./PostManager.module.css";
import React, { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { UserContext } from "../context/userContext";
import Link from "next/link";

export default function PostManagerPage() {
    const [postsList, setPostsList] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        const getPosts = async () => {
            const postsRef = collection(db, "posts");
            const snapshot = await getDocs(postsRef);
            setPostsList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        getPosts();
    }, []);

    const onSubmitPost = async () => {
        if (!user) {
            alert("You must be signed in to create a post.");
            return;
        }
        if (!newPostTitle || !newPostContent) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            const postsRef = collection(db, "posts");
            await addDoc(postsRef, {
                postTitle: newPostTitle,
                postContent: newPostContent,
                userName: user.userName || "Anonymous",
                datePublished: new Date(),
            });
            alert("Post created successfully!");
            // Optionally, refresh the posts list
        } catch (err) {
            console.error("Error creating post:", err);
            alert("Failed to create post.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.createPost}>
                <h3 >
                    Posting as: <strong>{user ? user.userName : "Guest"}</strong>
                </h3>
                <input
                    className={styles.input}
                    placeholder="Title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <textarea
                    className={styles.textarea}
                    placeholder="Post content"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                />
                <button className={styles.button} onClick={onSubmitPost}>
                    Submit Post
                </button>
            </div>
            <div className={styles.posts}>
                <h2 className="">Posts</h2>
                {postsList.map((post) => (
                    <div key={post.id} className={styles.post}>
                        <h3 className={styles.title}>{post.postTitle}</h3>
                        <p className={styles.contentPreview}>
                            {post.postContent.slice(0, 100)}...
                        </p>
                        <Link href={`/posts/${post.id}`} className={styles.readMore}>
                            Read more
                        </Link>
                        <p className={styles.meta}>
                            Posted by {post.userName} on{" "}
                            {new Date(post.datePublished.seconds * 1000).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
