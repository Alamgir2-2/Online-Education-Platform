import bcrypt from 'bcrypt';
import db from '../config/db.js'; // Make sure this path is correct

// Signup function
export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists with the same email and role
        const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ? AND role = ?', [email, role]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: `User already exists with this email and role: ${role}.` });
        }

        // Check if a user already exists with the same email but a different role
        // const [existingRole] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        // if (existingRole.length > 0) {
        //     return res.status(400).json({ message: `Email already used for another role. You can create an account with this email only once per role.` });
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await db.promise().query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
            [name, email, hashedPassword, role]);

        return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
