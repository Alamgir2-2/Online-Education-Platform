export const getInstructorProfile = (req, res) => {
    console.log('Session data:', req.session); // Log the full session object

    if (!req.session.user || req.session.user.role !== 'Instructor') {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const instructorData = {
        id: req.session.user.id,
        name: req.session.user.name,
        email: req.session.user.email,
        role: req.session.user.role,
    };

    return res.status(200).json(instructorData);
};
