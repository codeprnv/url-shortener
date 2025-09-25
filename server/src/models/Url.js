import mongoose from 'mongoose';

// Schema for storing URL details

const urlSchema = new mongoose.Schema({
  clicks: {
    default: 0,
    required: true,
    type: Number,
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
  originalUrl: {
    match: /^(ftp|http|https):\/\/[^ "]+$/, // Basic URL Validation
    required: true,
    trim: true,
    type: String,
  },
  qrcode: {
    required: true,
    type: String,
  },
  qrcodedescription: {
    required: true,
    type: String,
  },
  shortCode: {
    index: true, // Crucial for fast lookups during redirection
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
  status: {
    default: true,
    type: Boolean,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'User', // Creates a reference to the User Model
  },
});

const counterSchema = new mongoose.Schema({
  _id: {
    required: true,
    type: String,
  },
  seq: {
    default: 0,
    type: Number,
  },
});

export const Url = mongoose.model('Url', urlSchema);
export const Counter = mongoose.model('Counter', counterSchema);
