"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Activity_1 = __importDefault(require("../models/Activity"));
const router = express_1.default.Router();
// GET /api/activities/ - Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.default.find().populate('userId');
        res.json({
            message: 'Get all activities',
            data: activities
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.default.findById(id).populate('userId');
        if (!activity) {
            return res.status(404).json({ message: `Activity ${id} not found` });
        }
        res.json({
            message: `Get activity ${id}`,
            data: activity
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
// POST /api/activities/ - Log new activity
router.post('/', async (req, res) => {
    try {
        const { userId, type, duration, distance, calories } = req.body;
        const activity = await Activity_1.default.create({ userId, type, duration, distance, calories });
        await activity.populate('userId');
        res.json({
            message: 'Activity logged',
            data: activity
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to log activity' });
    }
});
// PUT /api/activities/:id - Update activity
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type, duration, distance, calories } = req.body;
        const activity = await Activity_1.default.findByIdAndUpdate(id, { type, duration, distance, calories }, { new: true }).populate('userId');
        if (!activity) {
            return res.status(404).json({ message: `Activity ${id} not found` });
        }
        res.json({
            message: `Activity ${id} updated`,
            data: activity
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update activity' });
    }
});
// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.default.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({ message: `Activity ${id} not found` });
        }
        res.json({
            message: `Activity ${id} deleted`
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
// GET /api/activities/user/:userId - Get user activities
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const activities = await Activity_1.default.find({ userId }).populate('userId');
        res.json({
            message: `Get activities for user ${userId}`,
            data: activities
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user activities' });
    }
});
exports.default = router;
//# sourceMappingURL=activities.js.map