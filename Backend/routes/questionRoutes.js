// routes/questionRoutes.js
import express from 'express';
import questionController from '../controllers/questionController.js';

const router = express.Router();

router.post('/', questionController.createQuestion);                         // Create a new question
router.get('/milestone/:milestoneId', questionController.getQuestionsByMilestone); // Get questions by milestone ID

export default router;
