import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, putAccessToken, removeAccessToken, login as apiLogin, register as apiRegister } from '../utils/api';

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
    const token = getAccessToken();
    if (token) {
      // In a real app, you might want to validate the token with the server
      setUser({ token });
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiLogin({ email, password });
      const { accessToken, user: userData } = data;
      putAccessToken(accessToken);
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
