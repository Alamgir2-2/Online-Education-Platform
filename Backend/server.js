import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS
import session from 'express-session'; // Import express-session
import authRoutes from './routes/authRoutes.js';
// import instructorRoutes from './routes/instructorRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Allow credentials (if needed)
}));

// Configure the session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Use the session secret from environment variables
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,       // Set this to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 // Session lasts for 1 day
    }
}));

// Use the auth routes
app.use(instructorRoutes);
app.use('/api', authRoutes); // All auth routes will be prefixed with /api

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to ePlatform API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

