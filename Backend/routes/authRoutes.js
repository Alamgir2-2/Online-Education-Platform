// import express from 'express';
// import { signup } from '../controllers/signup.js';
// import { login } from '../controllers/login.js';
// // import { getInstructorProfile } from '../controllers/instructor.js'; // Controller for instructor profile

// const router = express.Router();

// // Signup route
// router.post('/signup', signup);

// // Login route
// router.post('/login', login);

// // // Instructor profile route (change POST to GET)
// // router.get('/instructor', getInstructorProfile);

// export default router;


import express from 'express';
import { signup } from '../controllers/signup.js';
import { login } from '../controllers/login.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

export default router;

