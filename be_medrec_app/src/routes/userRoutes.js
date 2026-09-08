import express from 'express'
import {createUser, getUsers, getUserById, updateUser, deleteUser} from '../controllers/userController.js'
import { auth } from '../middleware/auth.js';

const router = express.Router()

router.get('/users', auth, getUsers);
router.post('/users', auth, createUser);
router.get('/users/:id', auth, getUserById);
router.delete('/users/:id', auth, deleteUser);
router.patch('/users/:id', auth, updateUser);

export default router;