// server\src\routes\url.js

import { Router } from 'express';

import {
  deleteUrl,
  getAllUrls,
  getUrlMetaData,
  shortenUrl,
} from '../controllers/urlController.js';

const router = Router();

router.route('/').post(shortenUrl).get(getAllUrls);

// Handle delete requests
router.route('/:id').delete(deleteUrl);

router.get('/meta/:shortId', getUrlMetaData);

export default router;
