// routes/milestoneRoutes.js
import express from 'express';
import milestoneController from '../controllers/milestoneController.js';

const router = express.Router();

router.post('/', milestoneController.createMilestone);                  // Create a new milestone
router.get('/course/:courseId', milestoneController.getMilestonesByCourse); // Get milestones by course ID

export default router;
