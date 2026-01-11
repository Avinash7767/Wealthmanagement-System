import express, { Request, Response } from 'express';
import { portfolioService, transactionService } from '../services/dbService';
import { verifyToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get user's financial summary
router.get('/financial-summary', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    // Get user's portfolios
    const portfolios = await portfolioService.findByUserId(userId);
    
    // Calculate assets from portfolios
    let totalInvestments = 0;
    portfolios.forEach(portfolio => {
      if (portfolio.assets) {
        portfolio.assets.forEach(asset => {
          totalInvestments += asset.quantity * (asset.currentPrice || 0);
        });
      }
    });

    // Get user's transactions
    const transactions = await transactionService.findByUserId(userId);
    
    // Calculate monthly stats from transactions
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    
    transactions.forEach(transaction => {
      if (transaction.date.getMonth() === currentMonth && 
          transaction.date.getFullYear() === currentYear) {
        if (transaction.type === 'income') {
          monthlyIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
          monthlyExpenses += transaction.amount;
        }
      }
    });
    
    const monthlySavings = monthlyIncome - monthlyExpenses;
    const savingsRate = monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : 0;

    // Return financial summary
    res.json({
      netWorth: monthlySavings, // Simplified calculation
      assets: {
        cash: 0, // Placeholder - would come from actual data
        bankAccounts: 0, // Placeholder - would come from actual data
        investments: {
          stocks: 0, // Would come from actual portfolio data
          mutualFunds: 0, // Would come from actual portfolio data
          fixedDeposits: 0, // Would come from actual portfolio data
          ppf: 0, // Would come from actual portfolio data
        },
        property: 0, // Placeholder - would come from actual data
        gold: 0, // Placeholder - would come from actual data
      },
      liabilities: {
        homeLoan: 0, // Placeholder - would come from actual data
        carLoan: 0, // Placeholder - would come from actual data
        personalLoan: 0, // Placeholder - would come from actual data
        creditCards: 0, // Placeholder - would come from actual data
        otherLoans: 0, // Placeholder - would come from actual data
      },
      monthlyStats: {
        income: monthlyIncome,
        expenses: monthlyExpenses,
        savings: monthlySavings,
        savingsRate: Math.max(0, savingsRate),
      },
      netWorthHistory: [], // Would come from historical data
      wealthForecast: [], // Would come from forecast calculations
    });
  } catch (error) {
    console.error('Error fetching financial summary:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Update user's financial data
router.post('/financial-data', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const financialData = req.body;

    // For now, we'll just return success - in a real app this would update user financial data
    // This would involve creating/updating transactions, portfolio items, etc.
    
    res.json({
      message: 'Financial data updated successfully',
      data: financialData
    });
  } catch (error) {
    console.error('Error updating financial data:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Get user's budget data
router.get('/budget-data', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    
    // Get user's transactions
    const transactions = await transactionService.findByUserId(userId);
    
    // Filter only expenses for budget data
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = transactions.filter(transaction => {
      return transaction.type === 'expense' &&
        transaction.date.getMonth() === currentMonth &&
        transaction.date.getFullYear() === currentYear;
    });
    
    // Group expenses by category
    const budgetDataByCategory: Record<string, number> = {};
    
    monthlyExpenses.forEach(transaction => {
      const category = transaction.category || 'Uncategorized';
      budgetDataByCategory[category] = (budgetDataByCategory[category] || 0) + transaction.amount;
    });
    
    // Convert to array format expected by the chart
    const budgetData = Object.entries(budgetDataByCategory).map(([category, amount]) => ({
      category,
      amount,
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)` // Will be overridden by frontend
    }));
    
    // If no data, return empty array
    if (budgetData.length === 0) {
      res.json({
        budgetData: [],
        totalBudget: 0
      });
    } else {
      const totalBudget = budgetData.reduce((sum, item) => sum + item.amount, 0);
      
      res.json({
        budgetData,
        totalBudget
      });
    }
  } catch (error) {
    console.error('Error fetching budget data:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;