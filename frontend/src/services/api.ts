import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add JWT token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wm_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Financial data API calls
export const financialApi = {
  // Get user's financial summary
  getUserFinancialSummary: async () => {
    try {
      const response = await api.get('/financial-summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching financial summary:', error);
      // Return default values if API fails
      return {
        netWorth: 0,
        assets: {
          cash: 0,
          bankAccounts: 0,
          investments: {
            stocks: 0,
            mutualFunds: 0,
            fixedDeposits: 0,
            ppf: 0,
          },
          property: 0,
          gold: 0,
        },
        liabilities: {
          homeLoan: 0,
          carLoan: 0,
          personalLoan: 0,
          creditCards: 0,
          otherLoans: 0,
        },
        monthlyStats: {
          income: 0,
          expenses: 0,
          savings: 0,
          savingsRate: 0,
        },
        netWorthHistory: [],
        wealthForecast: [],
      };
    }
  },

  // Update user's financial data
  updateUserFinancialData: async (financialData: any) => {
    try {
      const response = await api.post('/financial-data', financialData);
      return response.data;
    } catch (error) {
      console.error('Error updating financial data:', error);
      throw error;
    }
  },

  // Get user's goals
  getUserGoals: async () => {
    try {
      const response = await api.get('/goals');
      return response.data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      return [];
    }
  },

  // Add/update goal
  updateGoal: async (goalData: any) => {
    try {
      const response = await api.post('/goals', goalData);
      return response.data;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  },
};

export default api;