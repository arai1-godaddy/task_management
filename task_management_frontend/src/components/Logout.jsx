import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/api';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout API
      localStorage.removeItem('user'); // Clear user data from localStorage
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure (e.g., show an error message)
    }
};

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 text-white font-medium rounded-lg focus:outline-none focus:ring-4 bg-red-600 hover:bg-red-700 focus:ring-red-300`}
    >
      Log Out
    </button>
  );
};

export default Logout;
