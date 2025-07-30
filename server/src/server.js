import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import dotenvExpand from 'dotenv-expand'


// Load the environment variable from .env file
const myEnv = dotenv.config({ path: path.resolve(".env"), debug: true });
dotenvExpand.expand(myEnv)
console.log(dotenvExpand.expand(myEnv));


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
