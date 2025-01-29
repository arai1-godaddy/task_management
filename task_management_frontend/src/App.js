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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return auth ? children : <Navigate to="/auth/login" />;
};

const PublicRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth ? <Navigate to="/dashboard" /> : children;
};

const App = () => {
  const { auth } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        {/* Header */}
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            {auth && <LogoutButton />} {/* Only show LogoutButton if authenticated */}
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-8 px-4">
          <Routes>
            {/* Auth Routes */}
            <Route
              path="/auth/login"
              element={
                <PublicRoute>
                  <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                    <LoginForm />
                  </div>
                </PublicRoute>
              }
            />
            <Route
              path="/auth/sign-up"
              element={
                <PublicRoute>
                  <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                    <SignUpForm />
                  </div>
                </PublicRoute>
              }
            />

            {/* Email Confirmation */}
            <Route
              path="/confirm/:confirmation_token"
              element={
                <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                  <ConfirmationPage />
                </div>
              }
            />

            {/* User Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                  <NotFound />
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Task Manager. All rights reserved.</p>
        </footer>
      </Router>
    </div>
  );
};

export default App;
