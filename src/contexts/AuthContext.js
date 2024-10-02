import React, { createContext, useState, useContext } from 'react';


const AuthContext = createContext();

// Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  // AuthProvider component that wraps the app and provides the auth state
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initially, no user is logged in
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // Mock login function (could be replaced with real API call)
    const login = (username, password) => {
      // For demo purposes, we're assuming the login is successful
      const userData = { username, token: 'fake-jwt-token' };
      setUser(userData);
      setIsAuthenticated(true);
    };
  
    // Mock logout function
    const logout = () => {
      setUser(null);
      setIsAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };






