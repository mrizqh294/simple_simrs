import express from 'express'
import { getPoli } from '../controllers/poliController.js';
import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/poli', auth, getPoli);


export default router;