"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Team_1 = __importDefault(require("../models/Team"));
const router = express_1.default.Router();
// GET /api/teams/ - Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.default.find().populate('members').populate('createdBy');
        res.json({
            message: 'Get all teams',
            data: teams
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// GET /api/teams/:id - Get team by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.default.findById(id).populate('members').populate('createdBy');
        if (!team) {
            return res.status(404).json({ message: `Team ${id} not found` });
        }
        res.json({
            message: `Get team ${id}`,
            data: team
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// POST /api/teams/ - Create new team
router.post('/', async (req, res) => {
    try {
        const { name, description, createdBy } = req.body;
        const team = await Team_1.default.create({ name, description, createdBy });
        await team.populate('createdBy');
        res.json({
            message: 'Team created',
            data: team
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create team' });
    }
});
// PUT /api/teams/:id - Update team
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const team = await Team_1.default.findByIdAndUpdate(id, { name, description }, { new: true }).populate('members').populate('createdBy');
        if (!team) {
            return res.status(404).json({ message: `Team ${id} not found` });
        }
        res.json({
            message: `Team ${id} updated`,
            data: team
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update team' });
    }
});
// DELETE /api/teams/:id - Delete team
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.default.findByIdAndDelete(id);
        if (!team) {
            return res.status(404).json({ message: `Team ${id} not found` });
        }
        res.json({
            message: `Team ${id} deleted`
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
// POST /api/teams/:id/members - Add member to team
router.post('/:id/members', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const team = await Team_1.default.findByIdAndUpdate(id, { $addToSet: { members: userId } }, { new: true }).populate('members');
        if (!team) {
            return res.status(404).json({ message: `Team ${id} not found` });
        }
        res.json({
            message: `User ${userId} added to team ${id}`,
            data: team
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add member to team' });
    }
});
exports.default = router;
//# sourceMappingURL=teams.js.map