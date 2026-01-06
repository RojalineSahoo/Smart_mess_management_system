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

    // 1. Normalize input for checking
    const input = rollNo.trim().toLowerCase();
    
    // 2. Determine role based on your prefix idea
    const isAdmin = input.startsWith('admin');
    const isStudent = input.startsWith('student');

    if (!isAdmin && !isStudent) {
      alert("Invalid Format! Please use 'admin_name' or 'student_name' to log in.");
      return;
    }

    const role = isAdmin ? 'admin' : 'student';

    // 3. Create a User Object
    // We pass the actual rollNo typed so it serves as a unique ID for meal counts
    const userData = {
      id: rollNo, // This will be student_rahul, student_priya, etc.
      name: rollNo,
      role: role
    };

    // 4. Update Global Auth State
    login(userData);

    // 5. Programmatic Navigation
    if (role === 'admin') {
      console.log(`Admin logged in as: ${rollNo}`);
      navigate('/admin');
    } else {
      console.log(`Student logged in as: ${rollNo}`);
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>SmartMess</h1>
          <p>Login with your designated prefix (student_ or admin_)</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Username / Roll Number</label>
            <input 
              type="text" 
              placeholder="e.g. student_rahul or admin_01" 
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

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Role-based access enabled. Prefixes are mandatory.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;