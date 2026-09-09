import express from 'express'
import { createVisit, updateVisitStatus } from '../controllers/visitController.js'
import { auth } from '../middleware/auth.js';

const router = express.Router()

router.post('/visits', auth, createVisit);
router.patch('/visits/:id/status', auth, updateVisitStatus);

export default router;