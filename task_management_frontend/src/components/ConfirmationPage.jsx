import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { resendConfirmationEmail } from '../utils/api';

const ConfirmationPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    try {
      await resendConfirmationEmail(email);
      setMessage('Confirmation email sent. Please check your inbox.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resend confirmation email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Confirm Your Email</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
        </div>
        <button
          onClick={handleResendEmail}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Resend Confirmation Email
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
