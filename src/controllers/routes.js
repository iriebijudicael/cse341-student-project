import express from 'express';
import { getUser, getUsername } from './user.js';

const router = express.Router();

router.get('/user', getUser);
router.get('/username', getUsername);

export default router;