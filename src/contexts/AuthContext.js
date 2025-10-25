import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, putAccessToken, removeAccessToken, login as apiLogin, register as apiRegister, getCurrentUser } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          // Validate token and get user data
          const userData = await getCurrentUser();
          setUser({ ...userData, token });
        } catch (error) {
          // Token is invalid, remove it
          console.error('Token validation failed:', error);
          removeAccessToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiLogin({ email, password });
      const { accessToken } = data;
      putAccessToken(accessToken);
      
      // Fetch user data after successful login
      const userData = await getCurrentUser();
      setUser({ ...userData, token: accessToken });
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Network error occurred' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const result = await apiRegister({ name, email, password });
      // Registration successful, but no user data returned
      return { success: true, message: result.message };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message || 'Network error occurred' };
    }
  };

  const logout = () => {
    removeAccessToken();
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
