// server\src\controllers\urlController.js

import { Url, Counter } from '../models/Url.js';
import { encode } from '../utils/base62.js';
import { URL } from 'url';
import { redisClient } from '../config/redis.js';
import qrcode from 'qrcode';

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
  // ---Input Validation
  if (!originalUrl) {
    return res.status(400).json({ error: 'originalUrl is required!!' });
  }
  try {
    // Validate the URL Format
    new URL(originalUrl);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL Format!!' });
  }
  try {
    // --- Check if the URL already exists to prevent duplicates ---
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.status(200).json({
        shortlink: `${process.env.BASE_URL}/${url.shortCode}`,
        originallink: url.originalUrl,
        qrcode: url.qrcode,
        qrcodedescription: url.qrcodedescription,
        clicks: url.clicks,
        status: url.status,
        date: url.createdAt.toISOString(),
      });
    }

    //  --- Create New Short URL
    const urlId = await getNextSequence();
    const shortCode = encode(urlId);
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    // --- Generate QR Code ---
    const qrCodeDataUrl = await qrcode.toDataURL(shortUrl);

    url = new Url({
      originalUrl,
      shortCode,
      qrcode: qrCodeDataUrl,
      qrcodedescription: `QR Code for ${shortUrl}`,
    });

    await url.save();

    await redisClient.set(shortCode, url.originalUrl, {
      expiration: {
        type: 'EX',
        value: 86400,
      },
    });

    return res.status(201).json({
      shortlink: shortUrl,
      originallink: url.originalUrl,
      qrcode: url.qrcode,
      qrcodedescription: url.qrcodedescription,
      clicks: url.clicks,
      status: url.status,
      date: url.createdAt.toISOString(),
    });
  } catch (err) {
    console.error('Server error: ', err);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

// --- Function to return URLMETADATA ---
export const getUrlMetaData = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL metadata not found!!' });
    }

    const responseData = {
      shortlink: `${process.env.BASE_URL}/${url.shortCode}`,
      originallink: url.originalUrl,
      qrcode: url.qrcode,
      qrcodedescription: url.qrcodedescription,
      clicks: url.clicks,
      status: url.status,
      date: url.createdAt.toISOString(),
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
      // Asynchronously update click count without making the user wait
      Url.updateOne({ shortCode }, { $inc: { clicks: 1 } }).catch((err) =>
        console.error(`Failed to update click count for ${shortCode}: ${err}`)
      );
      // Redirect immediately from cache
      return res.redirect(302, cachedUrl);
    }

    // Step 2. If not in cache, query the database
    const url = await Url.findOne({ shortCode });
    if (url) {
      // Set the value in the cache for the next request (TTL of 1 day)
      await redisClient.set(shortCode, url.originalUrl, {
        expiration: {
          type: 'EX',
          value: 86400,
        },
      });

      // Update the click count
      url.clicks++;
      await url.save();

      // Redirect the user
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
