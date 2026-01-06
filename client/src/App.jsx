import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Page Imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WeeklyMenu from './pages/WeeklyMenu';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Notices from './pages/Notices';

// Style Import
import './styles/global.css';

function App() {
  const { user } = useAuth();

  // Helper to check if user exists and has the correct role
  const isStudent = user && user.role === 'student';
  const isAdmin = user && user.role === 'admin';

  return (
    <Router>
      <Routes>
        {/* 1. LANDING PAGE */}
        <Route path="/" element={<Home />} />
        
        {/* 2. AUTHENTICATION ROUTES */}
        {/* If already logged in, don't show login page, redirect to dashboard */}
        <Route path="/login" element={
          user ? (isAdmin ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />) : <Login />
        } />
        <Route path="/register" element={<Register />} />

        {/* 3. PROTECTED STUDENT ROUTES */}
        <Route 
          path="/dashboard" 
          element={isStudent ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/menu" 
          element={isStudent ? <WeeklyMenu /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={isStudent ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/notices" 
          element={isStudent ? <Notices /> : <Navigate to="/login" />} 
        />

        {/* 4. PROTECTED ADMIN ROUTE */}
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminPanel /> : <Navigate to="/login" />} 
        />

        {/* 5. CATCH-ALL REDIRECT */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;