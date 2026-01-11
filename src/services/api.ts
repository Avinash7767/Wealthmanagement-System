import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  register: (userData: { email: string; password: string; name: string }) =>
    api.post('/users/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post('/users/login', credentials),
  
  getProfile: () => 
    api.get('/users/profile'),
};

// Portfolio API calls
export const portfolioAPI = {
  getAll: () => api.get('/portfolios'),
  getById: (id: string) => api.get(`/portfolios/${id}`),
  create: (portfolioData: { name: string; assets?: any[] }) => 
    api.post('/portfolios', portfolioData),
  update: (id: string, portfolioData: { name?: string; assets?: any[]; totalValue?: number }) => 
    api.put(`/portfolios/${id}`, portfolioData),
  delete: (id: string) => api.delete(`/portfolios/${id}`),
};

// Transaction API calls
export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  getById: (id: string) => api.get(`/transactions/${id}`),
  create: (transactionData: { 
    type: 'income' | 'expense' | 'transfer'; 
    amount: number; 
    category?: string; 
    description?: string; 
    date?: string; 
  }) => api.post('/transactions', transactionData),
  update: (id: string, transactionData: { 
    type?: 'income' | 'expense' | 'transfer'; 
    amount?: number; 
    category?: string; 
    description?: string; 
    date?: string; 
  }) => api.put(`/transactions/${id}`, transactionData),
  delete: (id: string) => api.delete(`/transactions/${id}`),
};

export default api;