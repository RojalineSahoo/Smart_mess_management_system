import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your custom hook
import '../styles/navbar.css';

const Navbar = ({ pageTitle }) => {
  const { logout } = useAuth(); // Get the logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clears the user state in React
    // 2. Removes the 'user' object from localStorage
    logout(); 
    
    // 3. Redirects to the login page immediately
    navigate('/login');
  };

  return (
    <header className="top-navbar">
      <h1>{pageTitle}</h1>
      <div className="nav-actions">
        <div className="user-profile">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-GJcqTtVoKjB0sG3v-e97JA4yzkqP_kQ71g&s" 
            alt="User" 
          />
          <div className="status-dot"></div>
        </div>
        <button className="icon-btn"><Bell size={20} /></button>
        
        {/* Added the onClick handler here */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;