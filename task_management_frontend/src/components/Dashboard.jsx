import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  fetchFilteredTasks,
  fetchTaskOptions,
  createTask,
  updateTask,
  deleteTask,
} from "../utils/api";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "", due_date: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Failed to fetch tasks");
        }
      } finally {
        setLoading(false);
      }
    };

    const loadOptions = async () => {
      try {
        const response = await fetchTaskOptions();
        setStatuses(response.data.statuses);
        setPriorities(response.data.priorities);
      } catch (err) {
        console.error("Failed to load filter options");
      }
    };

    loadTasks();
    loadOptions();
  }, [navigate]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError("Failed to create task");
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      const response = await updateTask(id, updatedData);
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      const response = await fetchFilteredTasks(filters);
      setTasks(response.data);
    } catch (err) {
      setError("Failed to filter tasks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>

      {/* Error Handling */}
      {error && <p className="bg-red-100 text-red-600 p-3 rounded-md mb-4">{error}</p>}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center my-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* Filtering Section */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold mb-3">Filter Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Priorities</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="due_date"
            value={filters.due_date}
            onChange={handleFilterChange}
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-200 w-full md:w-auto"
        >
          Apply Filters
        </button>
      </div>

      {/* Task Form */}
      <TaskForm onSubmit={handleCreateTask} />

      {/* Task List */}
      <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default Dashboard;
