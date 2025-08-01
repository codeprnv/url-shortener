// server\src\routes\url.js

import { Router } from "express";
import { shortenUrl } from '../controllers/urlController.js';

const router = Router();

// @route POST /api/v1/url
// @desc Create a short URL
router.post('/url', shortenUrl);

export default router;