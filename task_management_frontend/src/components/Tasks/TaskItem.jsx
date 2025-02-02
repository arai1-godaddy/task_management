import React, { useState, useEffect } from "react";
import { fetchTaskOptions, updateTask } from "../../utils/api";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editStatus, setEditStatus] = useState(task.status);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [options, setOptions] = useState({ statuses: [], priorities: [] });

  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await fetchTaskOptions();
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching task options:", error);
      }
    };
    getOptions();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedTask = { title: editTitle, status: editStatus, priority: editPriority };

      const response = await updateTask(task.id, updatedTask);
      onUpdate(task.id, response.data);
    } catch (error) {
      console.error("Failed to update task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-4 border border-gray-200">
      {/* Task Title */}
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Status & Priority Selection */}
      <div className="mt-3 flex gap-4">
        <select
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value)}
          className="w-1/2 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {options.statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
          className="w-1/2 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {options.priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
