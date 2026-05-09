
import express from 'express';
// Import your controller functions
import { showHomePage } from './index.js';
import { getAll, getSingle } from './contacts.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/contacts', getAll);
router.get('/contacts/:id', getSingle);

export default router;