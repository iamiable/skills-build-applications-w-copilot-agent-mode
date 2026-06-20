# OctoFit Tracker Backend - Database Setup

## MongoDB Connection

The backend is configured to connect to MongoDB on the local development machine.

**Connection Details:**
- **Host:** `localhost`
- **Port:** `27017`
- **Database:** `octofit_db`

## Mongoose Models

The following Mongoose models are defined in `src/models/`:

### User
- `name` - User's full name
- `email` - User's email (unique)
- `password` - (optional) User's password
- `profile` - Object containing user profile information
  - `bio` - User biography
  - `avatar` - Avatar image URL

### Team
- `name` - Team name
- `description` - Team description
- `members` - Array of User IDs
- `createdBy` - User ID of team creator

### Activity
- `userId` - Reference to User
- `type` - Activity type (running, cycling, strength_training, yoga, crossfit, etc.)
- `duration` - Duration in minutes
- `distance` - Distance in kilometers (for distance-based activities)
- `calories` - Calories burned
- `timestamp` - Activity timestamp

### Workout
- `userId` - Reference to User
- `name` - Workout name
- `exercises` - Array of exercise objects
  - `name` - Exercise name
  - `reps` - Number of repetitions
  - `sets` - Number of sets
- `duration` - Workout duration in minutes

### Leaderboard
- `userId` - (optional) Reference to User for individual rankings
- `teamId` - (optional) Reference to Team for team rankings
- `rank` - Current rank
- `score` - Points/score value
- `period` - Time period (all-time, weekly, monthly)

## Seeding the Database

### Prerequisites

Ensure MongoDB is running:
```bash
ps aux | grep mongod
```

### Run the Seed Script

To populate the database with sample data:

```bash
npm run seed
```

This will:
1. Connect to MongoDB
2. Clear existing collections
3. Create 5 sample users
4. Create 3 sample teams
5. Create 8 sample activities
6. Create 5 sample workouts
7. Create 8 sample leaderboard entries

**Example output:**
```
🌱 Starting database seed...
Connecting to mongodb://localhost:27017/octofit_db
✓ Connected to MongoDB
🗑️  Clearing existing data...
✓ Cleared existing collections
👥 Creating users...
✓ Created 5 users
🏆 Creating teams...
✓ Created 3 teams
🏃 Creating activities...
✓ Created 8 activities
💪 Creating workouts...
✓ Created 5 workouts
📊 Creating leaderboard entries...
✓ Created 8 leaderboard entries

✅ Database seed completed successfully!
```

## Verifying Data with API Endpoints

After seeding, start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:8000`

### Test Endpoints with curl

Get all users:
```bash
curl http://localhost:8000/api/users
```

Get all teams:
```bash
curl http://localhost:8000/api/teams
```

Get all activities:
```bash
curl http://localhost:8000/api/activities
```

Get global leaderboard:
```bash
curl http://localhost:8000/api/leaderboard
```

Get all workouts:
```bash
curl http://localhost:8000/api/workouts
```

Get API health status:
```bash
curl http://localhost:8000/api/health
```

## Database Management

### Clear Database

To clear all data from the database without seeding:

```bash
npx ts-node -e "
import mongoose from 'mongoose';
import User from './src/models/User';
import Team from './src/models/Team';
import Activity from './src/models/Activity';
import Workout from './src/models/Workout';
import Leaderboard from './src/models/Leaderboard';

mongoose.connect('mongodb://localhost:27017/octofit_db').then(async () => {
  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await Workout.deleteMany({});
  await Leaderboard.deleteMany({});
  console.log('Database cleared');
  process.exit(0);
});
"
```

### Check MongoDB Collections

Using mongosh:
```bash
mongosh
> use octofit_db
> show collections
> db.users.countDocuments()
> db.users.findOne()
```

## Notes

- The seed script uses realistic sample data including multiple users, teams with team memberships, activities with various types, and sample workout plans
- Timestamps for activities are set to the past 2 days for realistic data
- Leaderboard entries use calculated scores based on activity performance
- All timestamps use UTC with automatic `createdAt` and `updatedAt` fields
