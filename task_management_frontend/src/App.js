import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Login.jsx';
import SignUpForm from './components/Signup.jsx';
import LogoutButton from './components/Logout.jsx';
import ConfirmationPage from './components/ConfirmationPage';
import Dashboard from './components/Dashboard.jsx';
import NotFound from './components/NotFound.jsx';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth === undefined) {
    return <div>Loading...</div>;
  }

  return auth ? children : <Navigate to="/auth/login" />;
};

const PublicRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth ? <Navigate to="/dashboard" /> : children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/auth/sign-up" element={<PublicRoute><SignUpForm /></PublicRoute>} />

        {/* Email Confirmation */}
        <Route path="/confirm/:confirmation_token" element={<ConfirmationPage />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
