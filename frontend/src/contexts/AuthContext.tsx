import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { financialApi } from '../services/api';

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

const API_BASE_URL = 'http://localhost:5000/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('wm_user');
    const token = localStorage.getItem('wm_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        riskLevel: 'medium',
      };
      
      localStorage.setItem('wm_user', JSON.stringify(userData));
      localStorage.setItem('wm_token', data.token);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        riskLevel: 'medium',
      };
      
      localStorage.setItem('wm_user', JSON.stringify(userData));
      localStorage.setItem('wm_token', data.token);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('wm_user');
    localStorage.removeItem('wm_token');
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
