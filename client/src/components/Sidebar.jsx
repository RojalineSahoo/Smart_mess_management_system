import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Utensils, User, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import hook
import '../styles/sidebar.css';

const Sidebar = () => {
  const { user } = useAuth(); // Get user directly from context
  const role = user?.role || 'student'; // Fallback to student if not loaded

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="logo-box">
          <Utensils color="#10b981" size={24} /> {/* Updated to Emerald Green */}
        </div>
        <span>SmartMess</span>
      </div>

      <nav className="nav-menu">
        {role === 'student' ? (
          <>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink to="/menu" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <Utensils size={20} /> Weekly Menu
            </NavLink>
            <NavLink to="/profile" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <User size={20} /> Profile
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/admin" end className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <LayoutDashboard size={20} /> Admin Dashboard
            </NavLink>
            {/* These paths must match your App.js Routes exactly */}
            <NavLink to="/admin/menu" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <Utensils size={20} /> Menu Management
            </NavLink>
            <NavLink to="/admin/users" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <ShieldCheck size={20} /> User Management
            </NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className="nav-link">
          <Settings size={20} /> Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;