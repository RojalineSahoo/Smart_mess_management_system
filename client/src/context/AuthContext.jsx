// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if it exists
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mess_user');
    return savedUser ? JSON.parse(savedUser) : { role: null, isLoggedIn: false };
  });

  const login = (role) => {
    const userData = { role, isLoggedIn: true };
    setUser(userData);
    localStorage.setItem('mess_user', JSON.stringify(userData)); // Save to "DB"
  };

  const logout = () => {
    setUser({ role: null, isLoggedIn: false });
    localStorage.removeItem('mess_user'); // Clear from "DB"
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};