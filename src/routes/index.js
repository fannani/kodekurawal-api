import express from 'express';
import auth from './auth';
import client from './client';

const router = express.Router();
router.use('/auth', auth);
router.use(client);
export default router;
