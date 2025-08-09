import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if the token is present in the Authorization Header(Bearer Token)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's payload (excluding password) and attach it to the request object
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Not authorized, user not found!!' });
      }

      next();
    } catch (err) {
      console.error(`Error in the middleware: ${err}`);
      return res.status(401).json({ error: 'Not authorized, token failed!!' });
    }
  }
  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token!!' });
  }
};
