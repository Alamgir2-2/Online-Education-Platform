// instructorRoutes.js
import express from 'express';
import { getInstructorProfile } from '../controllers/instructorController.js';

const router = express.Router();

// New route to get the instructor profile
router.get('/api/getInstructorProfile', getInstructorProfile);

export default router;
