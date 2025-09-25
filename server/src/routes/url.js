// server\src\routes\url.js

import { Router } from 'express';

import { getUrlMetaData, shortenUrl } from '../controllers/urlController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

/* // @route POST /api/v1/url
// @desc Create a short URL
router.post('/url', protect, shortenUrl);

// @route GET /api/v1/url/meta/:shortCode
// @desc Returns url metadata
router.get('/url/meta/:shortCode', protect, getUrlMetaData); */

router.post('/url', shortenUrl);
router.get('/url/meta/:shortCode', getUrlMetaData);

export default router;
