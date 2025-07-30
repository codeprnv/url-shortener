import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import dotenvExpand from 'dotenv-expand'
import {loadConfig as loadAWSConfig} from './config/configLoader.js'

const startServer = async () => {
  // Conditionally load configuration based on the environment
  if (process.env.NODE_ENV === 'production') {
    // In Production(on AWS), load from Parameter Store
    await loadAWSConfig();
  } else {
    // In Development(locally), load from the .env file
    console.log('Running in development mode. Loading secrets from .env file');
    // Load the environment variable from .env file
    const myEnv = dotenv.config({ path: path.resolve('.env'), debug: true });
    dotenvExpand.expand(myEnv);
    // console.log(dotenvExpand.expand(myEnv));
  }
}

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

startServer();