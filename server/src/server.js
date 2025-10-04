// server/src/server.js

import dotenv from 'dotenv';

dotenv.config();

import { requireAuth } from '@clerk/express';
import cors from 'cors';
import express from 'express';

// import { loadConfig as loadAWSConfig } from './config/configLoader.js';
import connectDB from './config/db.js';
import { connectRedis } from './config/redis.js';
import { redirectUrl } from './controllers/urlController.js';
import { syncUser } from './middleware/authMiddleware.js';
import urlRoutes from './routes/url.js';

const startServer = async () => {
  // In a production environment, load secrets from AWS.
  // This will securely overwrite any values needed for production.
  if (process.env.NODE_ENV === 'production') {
    console.log('Running in production environment');
    // await loadAWSConfig();
  } else {
    console.log('Running in development environment');
  }

  await connectDB();
  await connectRedis();

  // Create and configure the Express app
  const app = express();
  const PORT = process.env.PORT || 5001;

  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: [
        'http://localhost:5173',
        'http://localhost:4173',
        'https://url-shortener03.firebaseapp.com',
        'https://url-shortener03.web.app',
        'https://url-shortener-cache.onrender.com',
        'https://linkly-03.vercel.app',
      ],
    })
  );

  // --- Routes ---
  app.get('/health', (req, res) => {
    res.status(200).send({ message: 'API is running', status: 'ok' });
  });

  // Public route
  app.get('/:shortCode', redirectUrl);

  // Protected route
  app.use('/api/v1/url', requireAuth(), syncUser, urlRoutes);

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer();
