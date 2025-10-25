import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: authLogin } = useAuth();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authLogin(email, password);
      if (!result.success) {
        setError(result.error);
        return false;
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register: authRegister } = useAuth();

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authRegister(name, email, password);
      if (!result.success) {
        setError(result.error);
        return false;
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
