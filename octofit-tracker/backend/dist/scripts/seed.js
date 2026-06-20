"use strict";
/**
 * Seed the octofit_db database with test data.
 *
 * This script initializes the OctoFit Tracker database with sample users,
 * teams, activities, workouts, and leaderboard entries for testing and development.
 *
 * Run with: npm run seed
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Workout_1 = __importDefault(require("../models/Workout"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seed() {
    try {
        console.log('🌱 Starting database seed...');
        console.log(`Connecting to ${MONGODB_URI}`);
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✓ Connected to MongoDB');
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User_1.default.deleteMany({});
        await Team_1.default.deleteMany({});
        await Activity_1.default.deleteMany({});
        await Workout_1.default.deleteMany({});
        await Leaderboard_1.default.deleteMany({});
        console.log('✓ Cleared existing collections');
        // Create users
        console.log('👥 Creating users...');
        const users = await User_1.default.create([
            {
                name: 'Alice Johnson',
                email: 'alice@octofit.com',
                profile: {
                    bio: 'Fitness enthusiast and marathon runner',
                    avatar: 'https://api.example.com/avatars/alice.jpg',
                },
            },
            {
                name: 'Bob Smith',
                email: 'bob@octofit.com',
                profile: {
                    bio: 'Gym regular, strength training focused',
                    avatar: 'https://api.example.com/avatars/bob.jpg',
                },
            },
            {
                name: 'Carol White',
                email: 'carol@octofit.com',
                profile: {
                    bio: 'Yoga and pilates instructor',
                    avatar: 'https://api.example.com/avatars/carol.jpg',
                },
            },
            {
                name: 'David Brown',
                email: 'david@octofit.com',
                profile: {
                    bio: 'Cycling enthusiast, outdoor adventure seeker',
                    avatar: 'https://api.example.com/avatars/david.jpg',
                },
            },
            {
                name: 'Eva Martinez',
                email: 'eva@octofit.com',
                profile: {
                    bio: 'HIIT and CrossFit competitor',
                    avatar: 'https://api.example.com/avatars/eva.jpg',
                },
            },
        ]);
        console.log(`✓ Created ${users.length} users`);
        // Create teams
        console.log('🏆 Creating teams...');
        const teams = await Team_1.default.create([
            {
                name: 'Morning Runners Club',
                description: 'Early risers committed to daily running',
                members: [users[0]._id, users[3]._id],
                createdBy: users[0]._id,
            },
            {
                name: 'Gym Warriors',
                description: 'Strength training and muscle building focus',
                members: [users[1]._id, users[4]._id],
                createdBy: users[1]._id,
            },
            {
                name: 'Wellness Warriors',
                description: 'Yoga, pilates, and mindful fitness',
                members: [users[2]._id, users[0]._id],
                createdBy: users[2]._id,
            },
        ]);
        console.log(`✓ Created ${teams.length} teams`);
        // Create activities
        console.log('🏃 Creating activities...');
        const activities = await Activity_1.default.create([
            {
                userId: users[0]._id,
                type: 'running',
                duration: 45,
                distance: 8.5,
                calories: 650,
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[0]._id,
                type: 'running',
                duration: 50,
                distance: 9.2,
                calories: 700,
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[1]._id,
                type: 'strength_training',
                duration: 60,
                distance: 0,
                calories: 500,
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[1]._id,
                type: 'strength_training',
                duration: 75,
                distance: 0,
                calories: 600,
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[2]._id,
                type: 'yoga',
                duration: 90,
                distance: 0,
                calories: 300,
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[3]._id,
                type: 'cycling',
                duration: 120,
                distance: 35,
                calories: 800,
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[4]._id,
                type: 'crossfit',
                duration: 60,
                distance: 0,
                calories: 700,
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[4]._id,
                type: 'crossfit',
                duration: 60,
                distance: 0,
                calories: 650,
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
        ]);
        console.log(`✓ Created ${activities.length} activities`);
        // Create workouts
        console.log('💪 Creating workouts...');
        const workouts = await Workout_1.default.create([
            {
                userId: users[0]._id,
                name: '10K Training Run',
                exercises: [
                    { name: 'Warm-up jog', reps: 1, sets: 1 },
                    { name: '10K run', reps: 1, sets: 1 },
                    { name: 'Cool-down walk', reps: 1, sets: 1 },
                ],
                duration: 50,
            },
            {
                userId: users[1]._id,
                name: 'Upper Body Strength',
                exercises: [
                    { name: 'Bench Press', reps: 8, sets: 4 },
                    { name: 'Barbell Rows', reps: 8, sets: 4 },
                    { name: 'Pull-ups', reps: 10, sets: 3 },
                ],
                duration: 60,
            },
            {
                userId: users[2]._id,
                name: 'Vinyasa Flow',
                exercises: [
                    { name: 'Sun Salutations', reps: 5, sets: 1 },
                    { name: 'Standing Poses', reps: 10, sets: 1 },
                    { name: 'Savasana', reps: 1, sets: 1 },
                ],
                duration: 90,
            },
            {
                userId: users[3]._id,
                name: 'Long Distance Cycle',
                exercises: [
                    { name: 'Road cycling', reps: 1, sets: 1 },
                ],
                duration: 120,
            },
            {
                userId: users[4]._id,
                name: 'EMOM Workout',
                exercises: [
                    { name: 'Burpees', reps: 15, sets: 20 },
                    { name: 'Kettlebell Swings', reps: 20, sets: 20 },
                ],
                duration: 60,
            },
        ]);
        console.log(`✓ Created ${workouts.length} workouts`);
        // Create leaderboard entries
        console.log('📊 Creating leaderboard entries...');
        const leaderboardEntries = await Leaderboard_1.default.create([
            {
                userId: users[0]._id,
                rank: 1,
                score: 3650,
                period: 'all-time',
            },
            {
                userId: users[4]._id,
                rank: 2,
                score: 2950,
                period: 'all-time',
            },
            {
                userId: users[1]._id,
                rank: 3,
                score: 2100,
                period: 'all-time',
            },
            {
                userId: users[3]._id,
                rank: 4,
                score: 1600,
                period: 'all-time',
            },
            {
                userId: users[2]._id,
                rank: 5,
                score: 1200,
                period: 'all-time',
            },
            {
                teamId: teams[0]._id,
                rank: 1,
                score: 5250,
                period: 'all-time',
            },
            {
                teamId: teams[1]._id,
                rank: 2,
                score: 5050,
                period: 'all-time',
            },
            {
                teamId: teams[2]._id,
                rank: 3,
                score: 4850,
                period: 'all-time',
            },
        ]);
        console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);
        console.log('\n✅ Database seed completed successfully!');
        console.log(`📊 Summary:`);
        console.log(`   - Users: ${users.length}`);
        console.log(`   - Teams: ${teams.length}`);
        console.log(`   - Activities: ${activities.length}`);
        console.log(`   - Workouts: ${workouts.length}`);
        console.log(`   - Leaderboard Entries: ${leaderboardEntries.length}`);
        await mongoose_1.default.disconnect();
        console.log('✓ Disconnected from MongoDB\n');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.js.map