import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmationPage = () => {
  const { confirmation_token } = useParams(); // Get token from URL
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        await axios.patch(`/confirmations/${confirmation_token}`);
        setMessage('Email confirmed successfully! You can now log in.');
        setSuccess(true);
      } catch (error) {
        setMessage(error.response?.data.error || 'Confirmation failed.');
        setSuccess(false);
      }
    };
    confirmEmail();
  }, [confirmation_token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className={`w-full max-w-lg p-8 rounded-lg shadow-lg ${
          success ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <h1
          className={`text-2xl font-bold mb-4 text-center ${
            success ? 'text-green-800' : 'text-red-800'
          }`}
        >
          {success ? 'Confirmation Successful' : 'Confirmation Failed'}
        </h1>
        <p className="text-center text-gray-700">{message}</p>
        {success && (
          <div className="text-center mt-6">
            <a
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Go to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;
