// app/DailyPlanner/TaskManager.js
'use client';  // Add this line to make it a Client Component

import React, { useState, useEffect } from "react";
import './tasks.css';
import TaskModal from "./TaskModal";
import { getAuth } from "firebase/auth";
import { db } from "../../app/config/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc, getDoc, setDoc, query, where, } from "firebase/firestore";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  const tasksCollectionRef = collection(db, "tasks");

  const fetchTasks = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error("User not logged in");
      setTasks([]); // Clear tasks if no user is logged in
      return; // Exit if no user is logged in
    }
  
    try {
      const tasksCollection = collection(db, "tasks");
      const q = query(tasksCollection, where("userId", "==", user.uid)); // Filter tasks by userId
      const querySnapshot = await getDocs(q);
  
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setTasks(tasks); // Update the state with the filtered tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  
    // Calculate completed tasks
    const completed = tasks.filter(task => task.status === "Completed").length;
    setCompletedTasks(completed);
  };  

  const fetchUserPoints = async () => {
    const userDoc = doc(db, "users", "user-id"); // Replace "user-id" with actual user ID logic
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      setTotalPoints(userSnapshot.data().totalPoints || 0);
    } else {
      // Create user document if missing
      await setDoc(userDoc, { totalPoints: 0 });
      setTotalPoints(0);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTasks(); // Fetch tasks if user is logged in
        fetchUserPoints(); // Fetch user points if user is logged in
      } else {
        setTasks([]); // Clear tasks if no user is logged in
        setTotalPoints(0); // Reset points
      }
    });
  
    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const handleAddTask = () => {
    setCurrentTask(null); // Clear current task
    setModalOpen(true); // Open the modal
  };

  const handleEditTask = (task) => {
    setCurrentTask(task); // Set task for editing
    setModalOpen(true); // Open the modal
  };

  const handleCompleteTask = async (task) => {
    const taskDoc = doc(db, "tasks", task.id);

    // Assign points based on priority
    const points =
      task.priority === "High" ? 50 :
      task.priority === "Medium" ? 30 : 
      10;

    // Update task status to "Completed"
    await updateDoc(taskDoc, { status: "Completed" });

    // Update user points
    const userDoc = doc(db, "users", task.userId); 
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      await setDoc(userDoc, { totalPoints: points }); // Initialize points
    } else {
      const currentPoints = userSnapshot.data().totalPoints || 0;
      await updateDoc(userDoc, { totalPoints: currentPoints + points });
    }

    const currentPoints = userSnapshot.data()?.totalPoints || 0;

    await updateDoc(userDoc, {
      totalPoints: currentPoints + points,
    });

    setTotalPoints(currentPoints + points);
    fetchTasks();
  };

  const handleDeleteTask = async (task) => {
    const taskDoc = doc(db, "tasks", task.id);
    await deleteDoc(taskDoc);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task => task.status !== "Completed");

  return (
    <div className="task-manager-container">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-glow text-4xl font-extrabold tracking-wide" >
          Task Manager
        </h1>
        <div className="bg-gray-800 text-yellow-400 px-4 py-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Total Points: {totalPoints}</h2>
        </div>
      </div>
  
      {/* Add Task Button */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md transition-all mt-4 hover:scale-105 focus:ring focus:ring-green-300 add-task-button"
        onClick={handleAddTask}
      >
        + Add Task
      </button>
  
      {/* Task List with Flexbox */}
      <div className="mt-6 task-list flex flex-wrap gap-6 justify-center">
        {tasks
          .filter((task) => task.status !== "Completed") // Exclude completed tasks
          .map((task) => (
            <div
              key={task.id}
              className="task-card transition-all hover:shadow-lg hover:scale-105"
            >
              {/* Task Title */}
              <h2 className="task-title text-blue-300">{task.title}</h2>
              {/* Task Description */}
              <p className="task-description">{task.description}</p>
              {/* Task Details */}
              <p className="task-info">
                <span className="font-medium">Deadline:</span>{" "}
                {task.deadline?.toDate().toLocaleDateString()}
              </p>
              <p className="task-info">
                <span className="font-medium">Priority:</span>{" "}
                <span className={`priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </p>
  
              {/* Task Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEditTask(task)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all hover:scale-105 focus:ring focus:ring-yellow-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all hover:scale-105 focus:ring focus:ring-red-300"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleCompleteTask(task)}
                  className="complete-btn px-4 py-2 rounded-lg font-semibold shadow-md transition-all hover:scale-105 focus:ring focus:ring-green-300"
                >
                  Complete
                </button>
              </div>
            </div>
          ))}
      </div>
  
      {/* Modal */}
      {modalOpen && (
        <TaskModal
          currentTask={currentTask}
          onClose={() => setModalOpen(false)}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
  
  
}  

export default TaskManager;