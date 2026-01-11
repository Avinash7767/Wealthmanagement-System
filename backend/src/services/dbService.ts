import mongoose from 'mongoose';
import { IUser } from '../models/User';
import { IPortfolio } from '../models/Portfolio';
import { ITransaction } from '../models/Transaction';
import { userMockService, portfolioMockService, transactionMockService } from './mockData';

// Check if MongoDB is connected
const isDbConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

// UserService - uses real DB when available, mock when not
const userService = {
  async findById(id: string): Promise<IUser | null> {
    if (isDbConnected()) {
      try {
        const user = await mongoose.models.User.findById(id).select('-password');
        return user as IUser | null;
      } catch (error) {
        console.error('Error finding user by ID:', error);
        throw error;
      }
    } else {
      return userMockService.findById(id);
    }
  },

  async findByEmail(email: string): Promise<IUser | null> {
    if (isDbConnected()) {
      try {
        const user = await mongoose.models.User.findOne({ email }).select('-password');
        return user as IUser | null;
      } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
      }
    } else {
      return userMockService.findByEmail(email);
    }
  },

  async create(userData: { email: string; password: string; name: string }): Promise<IUser> {
    if (isDbConnected()) {
      try {
        const existingUser = await mongoose.models.User.findOne({ email: userData.email });
        if (existingUser) {
          throw new Error('User with this email already exists');
        }

        const user = new mongoose.models.User(userData);
        return await user.save();
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    } else {
      return userMockService.create(userData);
    }
  }
};

// PortfolioService - uses real DB when available, mock when not
const portfolioService = {
  async findByUserId(userId: string): Promise<IPortfolio[]> {
    if (isDbConnected()) {
      try {
        return await mongoose.models.Portfolio.find({ userId });
      } catch (error) {
        console.error('Error finding portfolios by user ID:', error);
        throw error;
      }
    } else {
      return portfolioMockService.findByUserId(userId);
    }
  },

  async findById(id: string): Promise<IPortfolio | null> {
    if (isDbConnected()) {
      try {
        const portfolio = await mongoose.models.Portfolio.findById(id);
        return portfolio as IPortfolio | null;
      } catch (error) {
        console.error('Error finding portfolio by ID:', error);
        throw error;
      }
    } else {
      return portfolioMockService.findById(id);
    }
  },

  async create(portfolioData: { userId: string; name: string; assets?: any[] }): Promise<IPortfolio> {
    if (isDbConnected()) {
      try {
        const portfolio = new mongoose.models.Portfolio({
          userId: new mongoose.Types.ObjectId(portfolioData.userId),
          name: portfolioData.name,
          assets: portfolioData.assets || [],
          totalValue: portfolioData.assets ? portfolioData.assets.reduce((sum, asset) => sum + (asset.quantity * asset.currentPrice), 0) : 0
        });
        return await portfolio.save();
      } catch (error) {
        console.error('Error creating portfolio:', error);
        throw error;
      }
    } else {
      return portfolioMockService.create(portfolioData);
    }
  },

  async updateById(id: string, updateData: Partial<IPortfolio>): Promise<IPortfolio | null> {
    if (isDbConnected()) {
      try {
        const updatedPortfolio = await mongoose.models.Portfolio.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );
        return updatedPortfolio as IPortfolio | null;
      } catch (error) {
        console.error('Error updating portfolio:', error);
        throw error;
      }
    } else {
      return portfolioMockService.updateById(id, updateData);
    }
  },

  async deleteById(id: string): Promise<IPortfolio | null> {
    if (isDbConnected()) {
      try {
        const deletedPortfolio = await mongoose.models.Portfolio.findByIdAndDelete(id);
        return deletedPortfolio as IPortfolio | null;
      } catch (error) {
        console.error('Error deleting portfolio:', error);
        throw error;
      }
    } else {
      return portfolioMockService.deleteById(id);
    }
  }
};

// TransactionService - uses real DB when available, mock when not
const transactionService = {
  async findByUserId(userId: string): Promise<ITransaction[]> {
    if (isDbConnected()) {
      try {
        return await mongoose.models.Transaction.find({ userId }).sort({ date: -1 });
      } catch (error) {
        console.error('Error finding transactions by user ID:', error);
        throw error;
      }
    } else {
      return transactionMockService.findByUserId(userId);
    }
  },

  async findById(id: string): Promise<ITransaction | null> {
    if (isDbConnected()) {
      try {
        const transaction = await mongoose.models.Transaction.findById(id);
        return transaction as ITransaction | null;
      } catch (error) {
        console.error('Error finding transaction by ID:', error);
        throw error;
      }
    } else {
      return transactionMockService.findById(id);
    }
  },

  async create(transactionData: { userId: string; type: 'income' | 'expense' | 'transfer'; amount: number; category?: string; description?: string; date: Date }): Promise<ITransaction> {
    if (isDbConnected()) {
      try {
        const transaction = new mongoose.models.Transaction({
          userId: new mongoose.Types.ObjectId(transactionData.userId),
          type: transactionData.type,
          amount: transactionData.amount,
          category: transactionData.category,
          description: transactionData.description,
          date: transactionData.date
        });
        return await transaction.save();
      } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
      }
    } else {
      return transactionMockService.create(transactionData);
    }
  },

  async updateById(id: string, updateData: Partial<ITransaction>): Promise<ITransaction | null> {
    if (isDbConnected()) {
      try {
        const updatedTransaction = await mongoose.models.Transaction.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );
        return updatedTransaction as ITransaction | null;
      } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
      }
    } else {
      return transactionMockService.updateById(id, updateData);
    }
  },

  async deleteById(id: string): Promise<ITransaction | null> {
    if (isDbConnected()) {
      try {
        const deletedTransaction = await mongoose.models.Transaction.findByIdAndDelete(id);
        return deletedTransaction as ITransaction | null;
      } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
      }
    } else {
      return transactionMockService.deleteById(id);
    }
  }
};

export { userService, portfolioService, transactionService };