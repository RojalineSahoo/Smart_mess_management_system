import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Utensils, User, Settings, LogOut, ShieldCheck } from 'lucide-react';
import '../styles/sidebar.css';

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="logo-box">
          <Utensils color="#22c55e" size={24} />
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
            <NavLink to="/admin" className="nav-link"><LayoutDashboard size={20} /> Dashboard</NavLink>
            <NavLink to="/admin/menu" className="nav-link"><Utensils size={20} /> Menu Management</NavLink>
            <NavLink to="/admin/users" className="nav-link"><ShieldCheck size={20} /> User Management</NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-link settings-btn">
          <Settings size={20} /> Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;