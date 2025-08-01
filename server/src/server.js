// server/src/server.js

import dotenv from 'dotenv';
// --- FIX: Load .env variables first. This is safe for production ---
// This runs immediately and populates process.env from your .env file.
// In production, where there is no .env file, it does nothing, which is fine.
dotenv.config();

// --- Now that process.env is populated, import all other modules ---
import express from 'express';
import connectDB from './config/db.js';
import { connectRedis } from './config/redis.js';
import { loadConfig as loadAWSConfig } from './config/configLoader.js';
import urlRoutes from './routes/url.js';
import redirectRoutes from './routes/redirect.js';

const startServer = async () => {
  // In a production environment, load secrets from AWS.
  // This will securely overwrite any values needed for production.
  if (process.env.NODE_ENV === 'production') {
    await loadAWSConfig();
  } else {
    console.log('Running in development mode.');
  }

  // Connect to services using the final, correct configuration.
  await connectDB();
  await connectRedis();

  // Create and configure the Express app
  const app = express();
  const PORT = process.env.PORT || 5001;

  app.use(express.json());

  // --- Routes ---
  app.get('/health', (req, res) => {
    res.status(200).send({ status: 'ok', message: 'API is running' });
  });
  app.use('/api/v1', urlRoutes);
  app.use('/', redirectRoutes);

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer();
