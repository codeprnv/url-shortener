import mongoose from 'mongoose';

// Schema for storing URL details

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
    match: /^(ftp|http|https):\/\/[^ "]+$/, // Basic URL Validation
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 6,
    maxLength: 8,
    index: true, // Crucial for fast lookups during redirection
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // expiresAt: {
  //     type: Date
  // }
});

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

export const Url = mongoose.model('Url', urlSchema);
export const Counter = mongoose.model('Counter', counterSchema);
