import React, { useState } from "react";
import "./styles.css";
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
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !description || !deadline) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const selectedDate = new Date(`${deadline}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (selectedDate < today) {
      alert("The deadline cannot be in the past.");
      return;
    }
  
    const formattedDeadline = Timestamp.fromDate(selectedDate);
  
    const taskData = {
      title,
      description,
      deadline: formattedDeadline,
      priority,
    };
  
    if (currentTask) {
      taskData.status = status; // Include status when editing
    }
  
    try {
      setLoading(true);
  
      if (currentTask) {
        // Update existing task
        const taskDoc = doc(db, "tasks", currentTask.id);
        await updateDoc(taskDoc, taskData);
      } else {
        // Add a new task
        const tasksCollection = collection(db, "tasks");
        await addDoc(tasksCollection, taskData);
      }
  
      fetchTasks(); // Fetch the updated list of tasks
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving task:", error);
      alert("An error occurred while saving the task. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal container */}
      <div className="modal-container bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Modal Title */}
        <h2 className="modal-title text-2xl font-bold text-center mb-4 text-gray-800">
          {currentTask ? `Edit Task: ${currentTask.title}` : "Add New Task"}
        </h2>
        
        {/* Task Title Input */}
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal-input border-2 border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:border-blue-500 shadow-sm"
        />
        
        {/* Task Description Textarea */}
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="modal-textarea border-2 border-gray-300 rounded-lg p-3 w-full mb-4 h-28 resize-none focus:outline-none focus:border-blue-500 shadow-sm"
        ></textarea>
        
        {/* Task Deadline Input */}
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="modal-input border-2 border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:border-blue-500 shadow-sm"
        />
        
        {/* Task Priority Dropdown */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="modal-select border-2 border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:border-blue-500 shadow-sm bg-white"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        
        {/* Task Status Dropdown (for editing existing tasks) */}
        {currentTask && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="modal-select border-2 border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:border-blue-500 shadow-sm bg-white"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        )}
  
        {/* Modal Buttons */}
        <div className="flex justify-end gap-4">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="btn-cancel bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none shadow-md"
            disabled={loading}
          >
            Cancel
          </button>
          
          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`btn-save bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
  
  
};

export default TaskModal;
