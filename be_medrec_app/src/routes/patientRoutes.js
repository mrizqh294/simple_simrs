import express from 'express'
import { getPatients, createPatient, getPatientById, deletePatient, updatePatient} from '../controllers/patientController.js'
import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/patients', auth, getPatients);
router.post('/patients', auth, createPatient);
router.get('/patients/:id', auth, getPatientById);
router.delete('/patients/:id', auth, deletePatient);
router.patch('/patients/:id', auth, updatePatient);

export default router;