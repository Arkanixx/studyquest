import React, { useState, useEffect } from "react";
import TaskModal from "./TaskModal"; // Modal Component
import { db } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const tasksCollectionRef = collection(db, "tasks");

  // Fetch tasks from Firebase
  const fetchTasks = async () => {
    const data = await getDocs(tasksCollectionRef);
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Open Modal
  const handleAddTask = () => {
    setCurrentTask(null);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={handleAddTask}
      >
        Add Task
      </button>
      <div className="mt-6">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded mb-2">
            <h2 className="font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>
      {modalOpen && (
        <TaskModal
          currentTask={currentTask}
          onClose={() => setModalOpen(false)}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
};

export default TaskManager;
