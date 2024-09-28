import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import authRoutes from './routes/authRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Use CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Allow credentials (if needed)
}));

// Use the auth routes
app.use('/api', authRoutes); // All auth routes will be prefixed with /api

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to ePlatform API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
