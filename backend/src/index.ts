import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import models to register them with mongoose
import './models/User';
import './models/Portfolio';
import './models/Transaction';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB with enhanced error handling and connection lifecycle
const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wealth-management';
    
    const options = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      retryWrites: true,
    };
    
    // Attempt to connect to MongoDB
    await mongoose.connect(dbURI, options);
    
    // Check if it's the Atlas connection
    if (dbURI.includes('mongodb.net')) {
      console.log('Connected to MongoDB Atlas');
    } else {
      console.log('Connected to local MongoDB');
    }
    
    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (err) {
    console.error('Could not connect to MongoDB:', err);
    
    // Try to connect to local MongoDB as fallback
    try {
      console.log('Attempting to connect to local MongoDB as fallback...');
      await mongoose.connect('mongodb://localhost:27017/wealth-management', {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        retryWrites: true,
      });
      console.log('Connected to local MongoDB as fallback');
    } catch (localErr) {
      console.error('Could not connect to local MongoDB either:', localErr);
      process.exit(1);
    }
  }
};

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Backend is running!' });
});

import usersRouter from './routes/users';
import portfoliosRouter from './routes/portfolios';
import transactionsRouter from './routes/transactions';
import financialRouter from './routes/financial';
import goalsRouter from './routes/goals';

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/portfolios', portfoliosRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/financial', financialRouter);
app.use('/api/goals', goalsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
