import db from '../config/db.js'; 

// Get Instructor Profile
export const getInstructorProfile = async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'Instructor') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        // Query the database for the logged-in instructor's data
        const [instructor] = await db.promise().query('SELECT * FROM users WHERE id = ?', [req.session.user.id]);
        
        if (instructor.length === 0) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        
        // Return the instructor profile
        res.json(instructor[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
