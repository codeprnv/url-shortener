// server\src\controllers\urlController.js

import qrcode from 'qrcode';
import { URL } from 'url';

import { redisClient } from '../config/redis.js';
import { Counter, Url } from '../models/Url.js';
import { encode } from '../utils/base62.js';

const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.RENDER_URL
    : process.env.BASE_URL;
};



/*
 * Gets the next unique sequence number from the Counter collection
 * This is an atomic operation to prevent race conditions.
 * @returns {Promise<number>} The next unique ID.
 */
const getNextSequence = async () => {
  const result = await Counter.findByIdAndUpdate(
    { _id: 'url_counter' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true } // Creates the counter if it doesn't exist
  );
  return result.seq;
};

export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const userId = req.user._id;
  // ---Input Validation
  if (!originalUrl) {
    return res.status(400).json({ error: 'originalUrl is required!!' });
  }
  try {
    // Validate the URL Format
    new URL(originalUrl);
  } catch (err) {
    console.error(`Invalid URL format: `, err);
    res.status(400).json({ error: 'Invalid URL Format!!' });
  }
  try {
    // --- Check if the URL already exists to prevent duplicates ---
    let url = await Url.findOne({ originalUrl, user: userId });
    if (url) {
      const baseUrl = getBaseUrl();
      return res.status(200).json({
        clicks: url.clicks,
        date: url.createdAt.toISOString(),
        originallink: url.originalUrl,
        qrcode: url.qrcode,
        qrcodedescription: url.qrcodedescription,
        shortlink: `${baseUrl}/${url.shortCode}`,
        status: url.status,
      });
    }

    //  --- Create New Short URL
    const urlId = await getNextSequence();
    const shortCode = encode(urlId);
    const baseUrl = getBaseUrl();
    const shortUrl = `${baseUrl}/${shortCode}`;

    // --- Generate QR Code ---
    const qrCodeDataUrl = await qrcode.toDataURL(shortUrl);

    url = new Url({
      originalUrl,
      qrcode: qrCodeDataUrl,
      qrcodedescription: `QR Code for ${shortUrl}`,
      shortCode,
      user: userId,
    });

    await url.save();

    await redisClient.set(shortCode, url.originalUrl, {
      expiration: {
        type: 'EX',
        value: 86400,
      },
    });

    return res.status(201).json({
      clicks: url.clicks,
      date: url.createdAt.toISOString(),
      originallink: url.originalUrl,
      qrcode: url.qrcode,
      qrcodedescription: url.qrcodedescription,
      shortlink: shortUrl,
      status: url.status,
    });
  } catch (err) {
    console.error('Server error: ', err);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

// --- Function to return URLMETADATA ---
export const getUrlMetaData = async (req, res) => {
  try {
    const baseUrl = getBaseUrl()
    const { shortId } = req.params;
    const userId = req.user._id; //Get the MongoDB User ID from the middleware

    const url = await Url.findOne({ shortId, user: userId });

    if (!url) {
      return res.status(404).json({ error: 'URL metadata not found!!' });
    }

    const responseData = {
      clicks: url.clicks,
      date: url.createdAt.toISOString(),
      originallink: url.originalUrl,
      qrcode: url.qrcode,
      qrcodedescription: url.qrcodedescription,
      shortlink: `${baseUrl}/${url.shortCode}`,
      status: url.status,
    };

    return res.status(200).json(responseData);
  } catch (err) {
    console.error(`Metadata fetch error: ${err}`);
    res.status(500).json({ error: `Server error, Please try again later!!` });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Step 1. Check the cache first for the short code
    const cachedUrl = await redisClient.get(shortCode);

    if (cachedUrl) {
      res.redirect(302, cachedUrl);
      // Asynchronously update click count without making the user wait
      await Url.updateOne({ shortCode }, { $inc: { clicks: 1 } }).catch((err) =>
        console.error(`Failed to update click count for ${shortCode}: ${err}`)
      );
      return;
    }

    // Step 2. If not in cache, query the database
    const url = await Url.findOneAndUpdate(
      { shortCode },
      { $inc: { clicks: 1 } }
    );

    if (url) {
      // Set the value in the cache for the next request (TTL of 1 day)
      await redisClient.set(shortCode, url.originalUrl, {
        expiration: {
          type: 'EX',
          value: 86400,
        },
      });

      // Redirect the user to original url
      return res.redirect(302, url.originalUrl);
    } else {
      // If the short code does not exist in the DB, it's a 404
      return res.status(404).json({ error: 'Short URL not found!!' });
    }
  } catch (err) {
    console.error(`Redirect Error: ${err}`);
    res.status(500).json({ error: 'Server Error!!' });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const baseUrl = getBaseUrl()
    const userId = req.user._id;

    const urls = await Url.find({ user: userId }).sort({ createdAt: -1 });

    const formattedUrls = urls.map((url) => ({
      _id: url._id,
      clicks: url.clicks,
      date: url.createdAt.toISOString(),
      originallink: url.originalUrl,
      qrcode: url.qrcode,
      shortlink: `${baseUrl}/${url.shortCode}`,
      status: url.status,
    }));

    res.status(200).json(formattedUrls);
  } catch (err) {
    console.error(`Error fetching URLs: `, err);
    res.status(500).json({ error: `Server error, please try again later!` });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const url = await Url.findOneAndDelete({ _id: id, user: userId });

    if (!url) {
      return res.status(404).json({
        error: `Link not found or you do have permission to delete it!!`,
      });
    }

    if (url.shortCode) {
      await redisClient.del(url.shortCode);
    }

    res.status(200).json({ message: `Link deleted successfully!!` });
  } catch (err) {
    console.error(`Error deleting the URL: `, err);
    res.status(500).json({ error: `Server error, please try again later!!` });
  }
};
