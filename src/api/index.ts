import express from 'express';
import playlist from './playlist.routes';

const router = express.Router();

router.use('/playlist', playlist);

export default router;