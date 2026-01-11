import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateRiskLevel: (level: 'low' | 'medium' | 'high') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('wm_user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      
      const { user: userData, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('wm_user', JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        riskLevel: 'medium',
      }));
      
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        riskLevel: 'medium',
      });
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register({ name, email, password });
      
      const { user: userData, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('wm_user', JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        riskLevel: 'medium',
      }));
      
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        riskLevel: 'medium',
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('wm_user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateRiskLevel = (level: 'low' | 'medium' | 'high') => {
    if (user) {
      const updatedUser = { ...user, riskLevel: level };
      setUser(updatedUser);
      localStorage.setItem('wm_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateRiskLevel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
