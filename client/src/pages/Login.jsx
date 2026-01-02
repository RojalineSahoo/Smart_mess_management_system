import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const Login = () => {
  const [rollNo, setRollNo] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic: If roll number starts with 'admin', log in as admin
    if (rollNo.toLowerCase().includes('admin')) {
      login('admin');
      navigate('/admin');
    } else {
      login('student');
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p>Log in to your account to manage meals and view your schedule.</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>College Roll Number</label>
            <input 
              type="text" 
              placeholder="e.g., 20210042" 
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <div className="forgot-pass">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;