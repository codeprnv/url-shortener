import express from 'express';
import dotenv from 'dotenv';

// Load the environment variable from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
