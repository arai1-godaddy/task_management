import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    if (formData.password !== formData.password_confirmation) {
      setMessage('Passwords do not match.');
      return false;
    }
    if (formData.password.length < 8) {
      setMessage('Password must be at least 8 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setLoading(true);
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      await axios.post('/sign_up', formData, {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      });
      setMessage('Sign-up successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (error) {
      if (error.response?.status === 422) {
        setMessage(error.response.data.errors?.join(', ') || 'Invalid input.');
      } else {
        setMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              placeholder="Confirm your password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-center text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
