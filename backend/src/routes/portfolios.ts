import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { portfolioService, userService } from '../services/dbService';

const router = express.Router();

// Get all portfolios for a user
router.get('/', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const portfolios = await portfolioService.findByUserId(decoded.userId);
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Create a new portfolio
router.post('/', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const { name, assets } = req.body;
    
    const newPortfolio = await portfolioService.create({
      userId: decoded.userId,
      name,
      assets: assets || []
    });
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Get a specific portfolio
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const portfolio = await portfolioService.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Update a portfolio
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const { name, assets, totalValue } = req.body;
    
    const updatedPortfolio = await portfolioService.updateById(
      req.params.id,
      { name, assets, totalValue }
    );
    
    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Delete a portfolio
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here') as { userId: string };
    
    const deletedPortfolio = await portfolioService.deleteById(req.params.id);
    
    if (!deletedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;