import express from 'express';
import { signup } from '../controllers/signup.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

export default router;
