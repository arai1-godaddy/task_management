import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './components/Login.jsx';
import SignUpForm from './components/Signup.jsx';
import LogoutButton from './components/Logout.jsx';
import ConfirmationPage from './components/ConfirmationPage';
import Dashboard from './components/Dashboard.jsx';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <MainLayout />
      </Router>
    </div>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // Pages where Logout button should be hidden
  const hideLogoutPages = ["/login", "/sign_up"];

  return (
    <>
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          {/* Show Logout button only if user is logged in and not on login/signup pages */}
          {user && !hideLogoutPages.includes(location.pathname) && <LogoutButton />}
        </div>
      </header>

      <Routes>
        <Route path="/sign_up" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/" element={<SignUpForm />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Task Manager. All rights reserved.</p>
      </footer>
    </>
  );
};

export default App;
