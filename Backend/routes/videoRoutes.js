// routes/videoRoutes.js
import express from 'express';
import videoController from '../controllers/videoController.js';

const router = express.Router();

router.post('/', videoController.createVideo);                          // Create a new video
router.get('/milestone/:milestoneId', videoController.getVideosByMilestone); // Get videos by milestone ID
router.get('/:videoId', videoController.getVideoById);                  // Get a specific video by ID
router.put('/:videoId', videoController.updateVideo);                    // Update a video
router.delete('/:videoId', videoController.deleteVideo);                  // Delete a video

export default router;
