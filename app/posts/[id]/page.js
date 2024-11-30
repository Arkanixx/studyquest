"use client";
import React, { useEffect, useState, useContext } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";
import { UserContext } from "../../context/userContext";

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
        <div>
            <h1>{post.postTitle}</h1>
            <p>{post.postContent}</p>
            <p>Author: {post.userName}</p>
            <p>Published on: {new Date(post.datePublished.seconds * 1000).toLocaleString()}</p>

            <h2>Comments</h2>
            {comments.map((c) => (
                <div key={c.id}>
                    <p>
                        <strong>{c.userName}:</strong> {c.content}
                    </p>
                    <p>
                        <small>{new Date(c.date.seconds * 1000).toLocaleString()}</small>
                    </p>
                </div>
            ))}

            <div>
                <h3>Add a Comment</h3>
                <textarea
                    placeholder="Write your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={addComment}>Submit Comment</button>
            </div>
        </div>
    );
}
