import express from 'express'
import { registerPatient, getVisits, updateVisit } from '../controllers/registrationController.js'
import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/registration', auth, registerPatient);
router.get('/registration', auth, getVisits);
router.patch('/registration/:id', auth, updateVisit);

export default router;