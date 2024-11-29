import React, { useState } from "react";
import './styles.css';
import { db } from "./firebase";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

const TaskModal = ({ currentTask, onClose, fetchTasks }) => {
  const [title, setTitle] = useState(currentTask?.title || "");
  const [description, setDescription] = useState(currentTask?.description || "");
  const [deadline, setDeadline] = useState(
    currentTask?.deadline
      ? currentTask.deadline.toDate().toISOString().split("T")[0] 
      : ""
  );
  const [priority, setPriority] = useState(currentTask?.priority || "Medium");
  const [status, setStatus] = useState(currentTask?.status || "In Progress");

  const handleSave = async () => {
    // Convert the deadline to a Firestore Timestamp
    const formattedDeadline = deadline ? Timestamp.fromDate(new Date(deadline)) : null;

    const taskData = {
      title,
      description,
      deadline: formattedDeadline,
      priority,
      status, // Include status in the task data
    };

    if (currentTask) {
      // Update Task
      const taskDoc = doc(db, "tasks", currentTask.id);
      await updateDoc(taskDoc, taskData);
    } else {
      // Add Task
      const tasksCollection = collection(db, "tasks");
      await addDoc(tasksCollection, taskData);
    }

    fetchTasks();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold text-center mb-4">
          {currentTask ? "Edit Task" : "Add Task"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {currentTask && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
