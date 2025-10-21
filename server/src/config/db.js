import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const isProd = process.env.NODE_ENV === 'production';
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      ssl: isProd
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error in connecting MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
