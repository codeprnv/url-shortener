// server/src/server.js

import dotenv from 'dotenv';
// --- FIX: Load .env variables first. This is safe for production ---
// This runs immediately and populates process.env from your .env file.
// In production, where there is no .env file, it does nothing, which is fine.
dotenv.config();

// --- Now that process.env is populated, import all other modules ---
import cors from 'cors';
import express from 'express';

import { loadConfig as loadAWSConfig } from './config/configLoader.js';
import connectDB from './config/db.js';
import { connectRedis } from './config/redis.js';
import authRoutes from './routes/auth.js';
import redirectRoutes from './routes/redirect.js';
import urlRoutes from './routes/url.js';

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
  app.use(
    cors({
      origin: [
        'http://localhost:5173',
        'http://localhost:4173',
        'https://url-shortener03.firebaseapp.com',
        'https://url-shortener03.web.app',
        'https://url-shortener-cache.onrender.com',
        'https://linkly-03.vercel.app'
      ],
    })
  );

  // --- Routes ---
  app.get('/health', (req, res) => {
    res.status(200).send({ message: 'API is running', status: 'ok' });
  });
  app.use('/api/auth', authRoutes);
  app.use('/api/v1', urlRoutes);
  app.use('/', redirectRoutes);

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer();
