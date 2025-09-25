import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  password: {
    match:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    minlength: 6,
    required: [true, 'Password is required'],
    type: String,
  },
  username: {
    required: [true, 'Username is required'],
    type: String,
  },
});

// Middleware to hash the password before saving the user document

userSchema.pre('save', async function (next) {
  // Only this function if the password was modified
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password with the cost factor of 12
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare candidate password with the hashed password

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
