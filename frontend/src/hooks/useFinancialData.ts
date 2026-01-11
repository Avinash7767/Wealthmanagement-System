import { useState, useEffect } from 'react';
import { financialApi } from '@/services/api';

export const useFinancialData = () => {
  const [financialData, setFinancialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      const data = await financialApi.getUserFinancialSummary();
      setFinancialData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching financial data:', err);
      setError('Failed to load financial data');
      // Set default values when API fails
      setFinancialData({
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
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const refreshData = () => {
    fetchFinancialData();
  };

  return { financialData, loading, error, refreshData };
};