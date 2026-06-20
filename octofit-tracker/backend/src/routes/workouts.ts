import express, { Request, Response } from 'express';
import Workout from '../models/Workout';

const router = express.Router();

// GET /api/workouts/ - Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json({ 
      message: 'Get all workouts',
      data: workouts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('userId');
    if (!workout) {
      return res.status(404).json({ message: `Workout ${id} not found` });
    }
    res.json({ 
      message: `Get workout ${id}`,
      data: workout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST /api/workouts/ - Create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, exercises, duration } = req.body;
    const workout = await Workout.create({ userId, name, exercises, duration });
    await workout.populate('userId');
    res.json({ 
      message: 'Workout created',
      data: workout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// PUT /api/workouts/:id - Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, exercises, duration } = req.body;
    const workout = await Workout.findByIdAndUpdate(id, { name, exercises, duration }, { new: true }).populate('userId');
    if (!workout) {
      return res.status(404).json({ message: `Workout ${id} not found` });
    }
    res.json({ 
      message: `Workout ${id} updated`,
      data: workout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ message: `Workout ${id} not found` });
    }
    res.json({ 
      message: `Workout ${id} deleted`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

// GET /api/workouts/user/:userId - Get workouts for user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId }).populate('userId');
    res.json({ 
      message: `Get workouts for user ${userId}`,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user workouts' });
  }
});

// POST /api/workouts/:id/suggest - Get suggestions based on workout
router.post('/:id/suggest', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // This would contain logic to generate personalized suggestions
    const suggestions = [
      'Try increasing duration by 5-10 minutes',
      'Consider adding more sets to your exercises',
      'Try varying your workout routine for better results'
    ];
    res.json({ 
      message: `Get suggestions for workout ${id}`,
      suggestions: suggestions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

export default router;
