import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import dotenvExpand from 'dotenv-expand'
import {loadConfig as loadAWSConfig} from './config/configLoader.js'

const startServer = async () => {
  // Step 1: Conditionally load configuration based on the environment
  if (process.env.NODE_ENV === 'production') {
    // In production, load from Parameter Store
    await loadAWSConfig();
  } else {
    // In development, load from the .env file
    console.log('Running in development mode. Loading secrets from .env file.');
    dotenv.config();
  }

  // Step 2: Now that process.env is populated, connect to the database.
  // This MUST be inside the async function.
  await connectDB();

  // Step 3: Create and configure the Express app
  const app = express();
  const PORT = process.env.PORT || 5001;

  app.get('/health', (req, res) => {
    res.status(200).send({ status: 'ok', message: 'API is running' });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer();