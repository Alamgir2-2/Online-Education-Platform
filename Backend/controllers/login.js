import bcrypt from 'bcrypt';
import db from '../config/db.js'; // Adjust the path if necessary

// Login function
export const login = async (req, res) => {
    const { email, password, role } = req.body; // Make sure to include role

    try {
        // Check if the user exists with the provided email and role
        const [userRows] = await db.promise().query(
            'SELECT * FROM users WHERE email = ? AND role = ?',
            [email, role]
        );
        const user = userRows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or role.' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' }); // Send a response for incorrect password
        }

        // If login is successful, save the user information to the session
        // req.session.user = {
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     role: user.role
        // };

        req.session.user = user;

        
        req.session.save((err) => {
            if (err) {
                console.log('Error saving session:', err);
                return res.status(500).json({ message: 'Error saving session' });
            }
            console.log('Session saved:', req.session);
            return res.status(200).json({ message: 'Login successful!', user: req.session.user });
        });

        console.log('User logged in:', req.session.user);


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
