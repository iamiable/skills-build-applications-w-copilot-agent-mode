import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import { connectDatabase, getDatabaseUri } from './config/database';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Codespaces-aware base URL
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'API is running',
    baseUrl: baseUrl,
    codespaceMode: !!codespaceName,
    databaseUri: getDatabaseUri(),
  });
});

// Start server after database connection
async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
}

startServer();
