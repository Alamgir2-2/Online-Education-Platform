import express from 'express';
import multer from 'multer';
import { createBlog } from '../controllers/blogController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory for file uploads

// Route to create a new blog
router.post('/', upload.single('image'), createBlog);

export default router;
