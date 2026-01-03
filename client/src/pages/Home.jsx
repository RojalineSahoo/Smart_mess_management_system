import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Utensils, BarChart3, Clock } from 'lucide-react';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="logo">
          <Utensils className="logo-icon" />
          <span>SmartMess</span>
        </div>
        <div className="nav-links">
          <Link to="/login" className="login-button">Login</Link>
        </div>
      </nav>

      <header className="hero">
        <h1><span className="highlight">KCHR Girls' Hostel </span>Mess Management System </h1>
        <p>Track meals, view menus, and manage student attendance in real-time.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn-primary">Get Started</Link>
        </div>
      </header>

      <section className="features">
        <div className="feature-card"><Clock className="feat-icon" /><h3>Skip Meal Tracking</h3></div>
        <div className="feature-card"><BarChart3 className="feat-icon" /><h3>Daily Analytics</h3></div>
        <div className="feature-card"><ShieldCheck className="feat-icon" /><h3>Admin Control</h3></div>
      </section>
    </div>
  );
};

export default Home;