// routes/courseRoutes.js
import express from 'express';
import courseController from '../controllers/courseController.js';

const router = express.Router();

router.post('/', courseController.createCourse);      // Create a new course
router.get('/', courseController.getAllCourses);      // Get all courses

export default router;
