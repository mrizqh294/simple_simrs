import express from 'express'
import { createMedicalRecord, getMedicalRecords } from '../controllers/medicalRecordController.js'
import { auth } from '../middleware/auth.js';

const router = express.Router()

router.post('/medical-record', auth, createMedicalRecord);
router.get('/medical-record', auth, getMedicalRecords);

export default router;