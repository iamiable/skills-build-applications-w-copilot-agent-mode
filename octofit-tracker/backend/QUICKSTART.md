# Quick Start Guide - OctoFit Tracker Backend

## Prerequisites

- Node.js (LTS)
- MongoDB running on `localhost:27017`
- npm

## Setup & Running

### 1. Install Dependencies
```bash
cd octofit-tracker/backend
npm install
```

### 2. Seed the Database
```bash
npm run seed
```

This command will:
- Connect to MongoDB on `mongodb://localhost:27017/octofit_db`
- Clear existing data
- Insert 5 test users
- Create 3 teams with memberships
- Add 8 activities with realistic metrics
- Create 5 workout plans
- Set up leaderboard rankings

### 3. Start the Development Server
```bash
npm run dev
```

The API will be available at: `http://localhost:8000` or in Codespaces at: `https://{CODESPACE_NAME}-8000.app.github.dev`

### 4. Test the API

#### Get all users:
```bash
curl http://localhost:8000/api/users
```

#### Get all teams:
```bash
curl http://localhost:8000/api/teams
```

#### Get activities:
```bash
curl http://localhost:8000/api/activities
```

#### Check API health:
```bash
curl http://localhost:8000/api/health
```

## API Routes Overview

| Route | Method | Description |
|-------|--------|-------------|
| `/api/users` | GET | Get all users |
| `/api/users/:id` | GET | Get user by ID |
| `/api/users` | POST | Create new user |
| `/api/teams` | GET | Get all teams |
| `/api/teams/:id` | GET | Get team by ID |
| `/api/activities` | GET | Get all activities |
| `/api/activities/user/:userId` | GET | Get user's activities |
| `/api/workouts` | GET | Get all workouts |
| `/api/workouts/user/:userId` | GET | Get user's workouts |
| `/api/leaderboard` | GET | Get global leaderboard |
| `/api/leaderboard/teams` | GET | Get team leaderboard |
| `/api/leaderboard/team/:teamId` | GET | Get team's leaderboard |
| `/api/health` | GET | API health check |

## Build for Production

```bash
npm run build
npm start
```

## Available npm Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled backend
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint (if configured)

## Database Models

See [DATABASE.md](./DATABASE.md) for detailed information about:
- Database connection details
- Mongoose model schemas
- How to verify data creation
- MongoDB management commands

## Troubleshooting

### MongoDB not running
```bash
ps aux | grep mongod
```

If mongod is not running, refer to MongoDB installation documentation for your OS.

### Port 8000 already in use
The server will fail to start. Change the port by setting the `PORT` environment variable:
```bash
PORT=3000 npm run dev
```

### Module not found errors
Ensure all dependencies are installed:
```bash
npm install
```

### TypeScript compilation errors
Check `tsconfig.json` and ensure all type definitions are installed.
