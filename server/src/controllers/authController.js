import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

// Function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10d', //Token expires in 10 days
  });
};

// @route POST /api/auth/register
// @desc Register a new user
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists!!' });
    }
    const user = await User.create({ username, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: 'Invalid user data!!' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error in registering the user!!' });
  }
};

// @route POST /api/auth/login
// @desc Authenticate user & get token

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password!!' });
    }
  } catch (err) {
    console.error(`Error in login: ${err}`);
    res.status(500).json({ error: 'Server error during login!!' });
  }
};
