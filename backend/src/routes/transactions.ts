import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { transactionService } from '../services/dbService';

const router = express.Router();

// Get all transactions for a user
router.get('/', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const transactions = await transactionService.findByUserId(decoded.userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Create a new transaction
router.post('/', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const { type, amount, category, description, date } = req.body;
    
    if (!['income', 'expense', 'transfer'].includes(type)) {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }
    
    const newTransaction = await transactionService.create({
      userId: decoded.userId,
      type,
      amount,
      category,
      description,
      date: date || new Date()
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Get a specific transaction
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const transaction = await transactionService.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Update a transaction
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const { type, amount, category, description, date } = req.body;
    
    if (type && !['income', 'expense', 'transfer'].includes(type)) {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }
    
    const updatedTransaction = await transactionService.updateById(
      req.params.id,
      { type, amount, category, description, date }
    );
    
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Delete a transaction
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const deletedTransaction = await transactionService.deleteById(req.params.id);
    
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;