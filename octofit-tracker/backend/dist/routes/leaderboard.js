"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = express_1.default.Router();
// GET /api/leaderboard/ - Get global leaderboard
router.get('/', async (req, res) => {
    try {
        const { limit = 10, offset = 0 } = req.query;
        const leaderboard = await Leaderboard_1.default.find({ userId: { $ne: null } })
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET /api/leaderboard/teams - Get team leaderboard
router.get('/teams', async (req, res) => {
    try {
        const { limit = 10, offset = 0 } = req.query;
        const leaderboard = await Leaderboard_1.default.find({ teamId: { $ne: null } })
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// GET /api/leaderboard/team/:teamId - Get leaderboard for specific team
router.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { limit = 10, offset = 0 } = req.query;
        const leaderboard = await Leaderboard_1.default.find({ teamId })
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// POST /api/leaderboard/recalculate - Recalculate leaderboard rankings
router.post('/recalculate', async (req, res) => {
    try {
        // This would contain logic to recalculate rankings based on activities
        res.json({
            message: 'Leaderboard rankings recalculated'
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to recalculate leaderboard' });
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map