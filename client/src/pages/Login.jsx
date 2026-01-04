import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const Login = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Logic to determine role
    // We check if "admin" is typed anywhere in the Roll Number field
    const isAdmin = rollNo.toLowerCase().includes('admin');
    const role = isAdmin ? 'admin' : 'student';

    // 2. Call the context login function
    // This saves the role to LocalStorage and updates the Global State
    login(role);

    // 3. Programmatic Navigation
    // We navigate based on the 'role' variable we just created
    if (role === 'admin') {
      console.log("Redirecting to Admin Panel...");
      navigate('/admin');
    } else {
      console.log("Redirecting to Student Dashboard...");
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>SmartMess</h1>
          <p>Login to manage your meals and schedule.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Roll Number / Username</label>
            <input 
              type="text" 
              placeholder="Enter 'admin' for Admin Panel" 
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="forgot-pass">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>New student? <a href="#">Contact Admin</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;