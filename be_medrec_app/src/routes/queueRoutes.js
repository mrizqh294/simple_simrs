import express from 'express'
import { createQueue, getQueues, callQueue, updateQueueStatus } from '../controllers/queueController.js'
import { auth } from '../middleware/auth.js';

const router = express.Router()

router.post('/queues', auth, createQueue);
router.get('/queues', auth, getQueues);
router.patch('/queues/:id/call', auth, callQueue);
router.patch('/queues/:id/status', auth, updateQueueStatus);

export default router;