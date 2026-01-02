import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import '../styles/navbar.css';

const Navbar = ({ pageTitle }) => {
  return (
    <header className="top-navbar">
      <h1>{pageTitle}</h1>
      <div className="nav-actions">
        <div className="user-profile">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" alt="User" />
          <div className="status-dot"></div>
        </div>
        <button className="icon-btn"><Bell size={20} /></button>
        <button className="logout-btn">Logout <LogOut size={16} /></button>
      </div>
    </header>
  );
};

export default Navbar;