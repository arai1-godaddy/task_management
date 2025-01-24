import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = ({ setAuth }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      await axios.delete('/logout', {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      });
      setAuth(null); // Clear authentication state
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? 'Logging out...' : 'Log Out'}
    </button>
  );
};

export default LogoutButton;
