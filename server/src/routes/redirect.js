//  server\src\routes\redirect.js

import { Router } from 'express';
import { redirectUrl } from '../controllers/urlController.js';

const router = Router();

// @route GET /:shortCode
// desc Redirect to the Original URL
router.get('/:shortCode', redirectUrl);

export default router;
