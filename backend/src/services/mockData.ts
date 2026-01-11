import mongoose, { Types } from 'mongoose';
import { IUser } from '../models/User';
import { IPortfolio } from '../models/Portfolio';
import { ITransaction } from '../models/Transaction';

// Mock data storage
let mockUsers: any[] = [];
let mockPortfolios: any[] = [];
let mockTransactions: any[] = [];

// Generate mock ID
const generateId = (): string => Math.random().toString(36).substr(2, 9);

// UserService Mock
const userMockService = {
  async findById(id: string): Promise<IUser | null> {
    const user = mockUsers.find(u => u._id.toString() === id);
    if (user) {
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as IUser;
    }
    return null;
  },

  async findByEmail(email: string): Promise<IUser | null> {
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as IUser;
    }
    return null;
  },

  async create(userData: { email: string; password: string; name: string }): Promise<IUser> {
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      _id: generateId(),
      email: userData.email,
      password: userData.password,
      name: userData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUsers.push(newUser as IUser);
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword as IUser;
  }
};

// PortfolioService Mock
const portfolioMockService = {
  async findByUserId(userId: string): Promise<IPortfolio[]> {
    return mockPortfolios.filter(p => p.userId.toString() === userId) as IPortfolio[];
  },

  async findById(id: string): Promise<IPortfolio | null> {
    const portfolio = mockPortfolios.find(p => p._id.toString() === id);
    return portfolio as IPortfolio | null;
  },

  async create(portfolioData: { userId: string; name: string; assets?: any[] }): Promise<IPortfolio> {
    const newPortfolio = {
      _id: generateId(),
      userId: portfolioData.userId,
      name: portfolioData.name,
      assets: portfolioData.assets || [],
      totalValue: portfolioData.assets ? portfolioData.assets.reduce((sum, asset) => sum + (asset.quantity * asset.currentPrice), 0) : 0,
      createdAt: new Date(),
    };

    mockPortfolios.push(newPortfolio as unknown as IPortfolio);
    return newPortfolio as unknown as IPortfolio;
  },

  async updateById(id: string, updateData: Partial<IPortfolio>): Promise<IPortfolio | null> {
    const index = mockPortfolios.findIndex(p => p._id.toString() === id);
    if (index !== -1) {
      mockPortfolios[index] = {
        ...mockPortfolios[index],
        ...updateData,
        updatedAt: new Date()
      } as IPortfolio;
      return mockPortfolios[index] as unknown as IPortfolio;
    }
    return null;
  },

  async deleteById(id: string): Promise<IPortfolio | null> {
    const index = mockPortfolios.findIndex(p => p._id.toString() === id);
    if (index !== -1) {
      const deleted = mockPortfolios.splice(index, 1);
      return deleted[0] as unknown as IPortfolio;
    }
    return null;
  }
};

// TransactionService Mock
const transactionMockService = {
  async findByUserId(userId: string): Promise<ITransaction[]> {
    return mockTransactions
      .filter(t => t.userId.toString() === userId)
      .sort((a, b) => (b.date as Date).getTime() - (a.date as Date).getTime()) as ITransaction[];
  },

  async findById(id: string): Promise<ITransaction | null> {
    const transaction = mockTransactions.find(t => t._id.toString() === id);
    return transaction as ITransaction | null;
  },

  async create(transactionData: { userId: string; type: 'income' | 'expense' | 'transfer'; amount: number; category?: string; description?: string; date: Date }): Promise<ITransaction> {
    const newTransaction = {
      _id: generateId(),
      userId: transactionData.userId,
      type: transactionData.type,
      amount: transactionData.amount,
      category: transactionData.category,
      description: transactionData.description,
      date: transactionData.date,
      createdAt: new Date(),
    };

    mockTransactions.push(newTransaction as unknown as ITransaction);
    return newTransaction as unknown as ITransaction;
  },

  async updateById(id: string, updateData: Partial<ITransaction>): Promise<ITransaction | null> {
    const index = mockTransactions.findIndex(t => t._id.toString() === id);
    if (index !== -1) {
      mockTransactions[index] = {
        ...mockTransactions[index],
        ...updateData,
        updatedAt: new Date()
      } as ITransaction;
      return mockTransactions[index] as unknown as ITransaction;
    }
    return null;
  },

  async deleteById(id: string): Promise<ITransaction | null> {
    const index = mockTransactions.findIndex(t => t._id.toString() === id);
    if (index !== -1) {
      const deleted = mockTransactions.splice(index, 1);
      return deleted[0] as unknown as ITransaction;
    }
    return null;
  }
};

export { userMockService, portfolioMockService, transactionMockService };