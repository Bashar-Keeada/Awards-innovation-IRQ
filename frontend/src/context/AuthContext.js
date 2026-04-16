import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved auth
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth) {
      const { username, role } = JSON.parse(savedAuth);
      setUser({ username, role });
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    // Store credentials for API calls
    const credentials = btoa(`${username}:${password}`);
    localStorage.setItem('authCredentials', credentials);
    
    const role = username === 'admin' ? 'admin' : 'jury';
    localStorage.setItem('adminAuth', JSON.stringify({ username, role }));
    
    setUser({ username, role });
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('authCredentials');
    setUser(null);
    setIsAuthenticated(false);
  };

  const getAuthHeaders = () => {
    const credentials = localStorage.getItem('authCredentials');
    if (credentials) {
      return { 'Authorization': `Basic ${credentials}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
