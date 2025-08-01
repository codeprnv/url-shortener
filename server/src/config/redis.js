// server/src/config/redis.js

import { createClient } from 'redis';

// Export a variable that will be populated later.
// ES Modules use "live bindings", so when we assign a value to this
// later, all other modules that imported it will get the new value.
export let redisClient;

const connectRedis = async () => {
  // --- FIX: Initialize the client *inside* the connect function ---
  // This guarantees that process.env is populated before this code runs,
  // because connectRedis() is called from within startServer().
  const client = createClient({
    url: process.env.REDIS_URI,
  });

  client.on('error', (err) => console.error('Redis Client Error:', err));

  try {
    await client.connect();
    console.log('Redis connected successfully.');
    // Assign the connected client to our exported variable.
    redisClient = client;
  } catch (err) {
    console.error('Could not connect to Redis:', err);
    process.exit(1);
  }
};

// We only export the connect function now. The client is exported above.
export { connectRedis };
