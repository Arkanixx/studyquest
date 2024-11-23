import React, { useState } from "react";
import { db } from "./firebase";
import { addDoc, updateDoc, doc } from "firebase/firestore";

const TaskModal = ({ currentTask, onClose, fetchTasks }) => {
  const [title, setTitle] = useState(currentTask?.title || "");
  const [description, setDescription] = useState(currentTask?.description || "");
  const [deadline, setDeadline] = useState(currentTask?.deadline || "");
  const [priority, setPriority] = useState(currentTask?.priority || "Medium");

  const handleSave = async () => {
    if (currentTask) {
      // Update Task
      const taskDoc = doc(db, "tasks", currentTask.id);
      await updateDoc(taskDoc, { title, description, deadline, priority });
    } else {
      // Add Task
      await addDoc(collection(db, "tasks"), { title, description, deadline, priority });
    }
    fetchTasks();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-xl font-bold">
          {currentTask ? "Edit Task" : "Add Task"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 w-full mt-2"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 mt-4 ml-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
