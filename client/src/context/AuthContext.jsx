/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    // Default to null if no user is saved
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // UPDATED: Now accepts a full userData object
  const login = (userData) => {
    // userData will look like: { id: 'student_rahul', name: 'student_rahul', role: 'student' }
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 2. Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};