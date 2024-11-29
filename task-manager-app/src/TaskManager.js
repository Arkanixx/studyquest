import React, { useState, useEffect } from "react";
import './styles.css';
import TaskModal from "./TaskModal";
import { db } from "./firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const tasksCollectionRef = collection(db, "tasks");

  const fetchTasks = async () => {
    const data = await getDocs(tasksCollectionRef);
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchTasks();
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
    await updateDoc(taskDoc, { status: "Completed" });
    fetchTasks();
  };

  const handleDeleteTask = async (task) => {
    const taskDoc = doc(db, "tasks", task.id);
    await deleteDoc(taskDoc);
    fetchTasks();
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 text-white">
      <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md transition-all mt-4"
        onClick={handleAddTask}
      >
        Add Task
      </button>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks
          .filter((task) => task.status !== "Completed") // Exclude completed tasks
          .map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white text-black rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">
                Deadline: {task.deadline?.toDate().toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Priority: {task.priority}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditTask(task)} // Edit button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCompleteTask(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleDeleteTask(task)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
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
