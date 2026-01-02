import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Page Imports - Paths corrected to match your "pages" folder
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WeeklyMenu from './pages/WeeklyMenu';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Notices from './pages/Notices';

// Style Import - Points to your "styles" folder
import './styles/global.css';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes - Protected by AuthContext logic */}
        <Route 
          path="/dashboard" 
          element={user?.isLoggedIn && user?.role === 'student' ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/menu" 
          element={user?.isLoggedIn && user?.role === 'student' ? <WeeklyMenu /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={user?.isLoggedIn && user?.role === 'student' ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/notices" 
          element={user?.isLoggedIn && user?.role === 'student' ? <Notices /> : <Navigate to="/login" />} 
        />

        {/* Admin Route */}
        <Route 
          path="/admin" 
          element={user?.isLoggedIn && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />} 
        />

        {/* Default Redirect: Sends users to login if they visit an unknown path */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;