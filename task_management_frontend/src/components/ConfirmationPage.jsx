import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmationPage = () => {
  const { confirmation_token } = useParams(); // Get token from URL
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        await axios.patch(`/confirmations/${confirmation_token}`);
        setMessage('Email confirmed successfully! You can now log in.');
      } catch (error) {
        setMessage(error.response?.data.error || 'Confirmation failed.');
      }
    };
    confirmEmail();
  }, [confirmation_token]);

  return <p>{message}</p>;
};

export default ConfirmationPage;