import express, { Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = express.Router();

// GET /api/leaderboard/ - Get global leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const leaderboard = await Leaderboard.find({ userId: { $ne: null } })
      .populate('userId')
      .sort({ rank: 1 })
      .limit(Number(limit))
      .skip(Number(offset));
    res.json({ 
      message: 'Get global leaderboard',
      limit: limit,
      offset: offset,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/teams - Get team leaderboard
router.get('/teams', async (req: Request, res: Response) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const leaderboard = await Leaderboard.find({ teamId: { $ne: null } })
      .populate('teamId')
      .sort({ rank: 1 })
      .limit(Number(limit))
      .skip(Number(offset));
    res.json({ 
      message: 'Get team leaderboard',
      limit: limit,
      offset: offset,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET /api/leaderboard/team/:teamId - Get leaderboard for specific team
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const { limit = 10, offset = 0 } = req.query;
    const leaderboard = await Leaderboard.find({ teamId })
      .populate('userId')
      .sort({ rank: 1 })
      .limit(Number(limit))
      .skip(Number(offset));
    res.json({ 
      message: `Get leaderboard for team ${teamId}`,
      limit: limit,
      offset: offset,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// POST /api/leaderboard/recalculate - Recalculate leaderboard rankings
router.post('/recalculate', async (req: Request, res: Response) => {
  try {
    // This would contain logic to recalculate rankings based on activities
    res.json({ 
      message: 'Leaderboard rankings recalculated'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to recalculate leaderboard' });
  }
});

export default router;
