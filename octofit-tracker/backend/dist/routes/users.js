"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// GET /api/users/ - Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.json({
            message: 'Get all users',
            data: users
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: `User ${id} not found` });
        }
        res.json({
            message: `Get user ${id}`,
            data: user
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// POST /api/users/ - Create new user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User_1.default.create({ name, email });
        res.json({
            message: 'User created',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});
// PUT /api/users/:id - Update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await User_1.default.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!user) {
            return res.status(404).json({ message: `User ${id} not found` });
        }
        res.json({
            message: `User ${id} updated`,
            data: user
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `User ${id} not found` });
        }
        res.json({
            message: `User ${id} deleted`
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map