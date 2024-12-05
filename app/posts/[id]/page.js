"use client";
import React, { useEffect, useState, useContext } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";
import { UserContext } from "../../context/userContext";
import styles from "./PostDetail.module.css";

export default function PostDetailPage() {
    const params = useParams();
    const { id } = params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        const fetchPost = async () => {
            const postRef = doc(db, "posts", id);
            const postDoc = await getDoc(postRef);
            if (postDoc.exists()) {
                setPost({ id: postDoc.id, ...postDoc.data() });
            }
        };

        const fetchComments = async () => {
            const commentsRef = collection(db, `posts/${id}/comments`);
            const commentsSnapshot = await getDocs(commentsRef);
            const commentsList = commentsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(commentsList);
        };

        fetchPost();
        fetchComments();
    }, [id]);

    const addComment = async () => {
        if (!user) {
            alert("You must be signed in to comment.");
            return;
        }
        if (!newComment.trim()) {
            alert("Comment cannot be empty.");
            return;
        }
        try {
            const commentsRef = collection(db, `posts/${id}/comments`);
            await addDoc(commentsRef, {
                content: newComment,
                userName: user.userName || "Anonymous",
                date: new Date(),
            });
            setComments([...comments, { content: newComment, userName: user.userName, date: new Date() }]);
            setNewComment("");
            alert("Comment added successfully!");
        } catch (err) {
            console.error("Error adding comment:", err);
            alert("Failed to add comment.");
        }
    };

    if (!post) return <p>Loading post...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{post.postTitle}</h1>
            <p className={styles.meta}>
                Posted by {post.userName} on{" "}
                {new Date(post.datePublished.seconds * 1000).toLocaleString()}
            </p>
            <p className={styles.content}>{post.postContent}</p>

            <div className={styles.comments}>
                <h2 >Comments</h2>
                {comments.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                        <p className={styles.author}>{comment.userName}</p>
                        <p className={styles.text}>{comment.content}</p>
                        <p className={styles.meta}>
                            Posted on{" "}
                            {new Date(comment.date.seconds * 1000).toLocaleString()}
                        </p>
                    </div>
                ))}

                <textarea
                    className={styles.input}
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className={styles.button} onClick={addComment}>
                    Add Comment
                </button>
            </div>
        </div>
    );
}
