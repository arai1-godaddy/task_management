import React from 'react';
import axios from 'axios';

const LogoutButton = ({ setAuth }) => {
  const handleLogout = async () => {
    try {
      await axios.delete('/logout');
      setAuth(null); // Clear authentication state
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
