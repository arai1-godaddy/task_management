import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    status: 'pending',
    priority: 'low',
    due_date: '',
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
    setTaskData({ title: '', status: 'pending', priority: 'low', due_date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Status</label>
        <select
          name="status"
          value={taskData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Priority</label>
        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Due Date</label>
        <input
          type="date"
          name="due_date"
          value={taskData.due_date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]} // Restrict past dates
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;