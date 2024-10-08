// routes/courseRoutes.js
import express from 'express';
import courseController from '../controllers/courseController.js';
import milestoneController from '../controllers/milestoneController.js';
import questionController from '../controllers/questionController.js';
import videoController from '../controllers/videoController.js';

const router = express.Router();

router.post('/', courseController.createCourse);      // Create a new course
router.get('/', courseController.getAllCourses);      // Get all courses

router.post('/', milestoneController.createMilestone);                  // Create a new milestone
router.get('/course/:courseId', milestoneController.getMilestonesByCourse); // Get milestones by course ID

router.post('/', questionController.createQuestion);                         // Create a new question
router.get('/milestone/:milestoneId', questionController.getQuestionsByMilestone); // Get questions by milestone ID

router.post('/', videoController.createVideo);                          // Create a new video
router.get('/milestone/:milestoneId', videoController.getVideosByMilestone); // Get videos by milestone ID
router.get('/:videoId', videoController.getVideoById);                  // Get a specific video by ID
router.put('/:videoId', videoController.updateVideo);                    // Update a video
router.delete('/:videoId', videoController.deleteVideo);                  // Delete a video

export default router;
