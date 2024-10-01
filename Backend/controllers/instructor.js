import db from '../config/db.js';

export const getInstructorProfile = async (req, res) => {
    // Check if the user is logged in and is an instructor
    if (!req.session.user || req.session.user.role !== 'Instructor') {
        return res.status(401).json({ message: 'Unauthorized or not an instructor' });
    }

    const instructorId = req.session.user.id; // Get the logged-in user's ID

    try {
        // Fetch instructor data from the users table
        const [rows] = await db.promise().query(
            'SELECT id, name, email, role FROM users WHERE id = ? AND role = ?',
            [instructorId, 'instructor']
        );

        const instructor = rows[0];
        
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        // Return instructor data
        return res.status(200).json(instructor);
    } catch (error) {
        console.error('Error fetching instructor data:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
