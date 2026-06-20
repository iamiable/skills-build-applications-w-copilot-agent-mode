import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

// GET /api/users/ - Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({ 
      message: 'Get all users',
      data: users
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User ${id} not found` });
    }
    res.json({ 
      message: `Get user ${id}`,
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users/ - Create new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.json({ 
      message: 'User created',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: `User ${id} not found` });
    }
    res.json({ 
      message: `User ${id} updated`,
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: `User ${id} not found` });
    }
    res.json({ 
      message: `User ${id} deleted`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
