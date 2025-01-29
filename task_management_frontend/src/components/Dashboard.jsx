import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Dashboard
        </h1>
        <p className="text-lg text-center text-gray-600">
          Welcome to the Dashboard! Here you can manage your tasks and track progress.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            View Tasks
          </button>
          <button className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
            Add Task
          </button>
          <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
