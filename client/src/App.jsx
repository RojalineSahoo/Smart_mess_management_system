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

  return (
    <Router>
      <Routes>
        {/* 1. LANDING PAGE (Entry Point) 
            We use path="/" so this shows up at http://localhost:5173/ */}
        <Route path="/" element={<Home />} />
        
        {/* 2. AUTHENTICATION ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 3. PROTECTED STUDENT ROUTES 
            These check if user.isLoggedIn is true. 
            If not, they redirect to /login */}
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

        {/* 4. PROTECTED ADMIN ROUTE */}
        <Route 
          path="/admin" 
          element={user?.isLoggedIn && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />} 
        />

        {/* 5. CATCH-ALL REDIRECT 
            If a user enters a broken link, send them back to the Home page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;