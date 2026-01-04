import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // We use 'user' as the key to match your ProtectedRoute
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { role: null, isLoggedIn: false };
  });

  const login = (role) => {
    const userData = { role, isLoggedIn: true };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser({ role: null, isLoggedIn: false });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 2. THIS IS THE LINE YOU ARE LIKELY MISSING
// It must be named exactly 'useAuth'
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};