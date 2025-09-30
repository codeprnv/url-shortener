import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      required: true,
      type: String,
      unique: true,
    },
    email: {
      sparse: true,
      type: String,
      unique: true,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
