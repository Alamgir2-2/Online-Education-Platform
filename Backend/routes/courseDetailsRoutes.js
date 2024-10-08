import express from 'express';
import courseDetailsController from '../controllers/courseDetailsController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer(); 


const handleFormFields = upload.none(); 

// For handling file uploads (e.g., thumbnails)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Where to store the file (ensure this folder exists)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Save the file with a timestamp
  },
});

const uploadWithFile = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.fieldname === 'thumbnail' || file.fieldname.includes('milestones')) {
        cb(null, true);
      } else {
        cb(new Error('Unexpected field'));
      }
    }
  }).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'milestones[0][videos][0][file]', maxCount: 1 }, // Explicitly allow this nested file field
    { name: 'milestones[0][videos][1][file]', maxCount: 1 }, // Allow more video file fields as needed
  ]);

// Unified endpoint for all course details actions
router.post('', uploadWithFile ,courseDetailsController.handleRequest);

export default router;
