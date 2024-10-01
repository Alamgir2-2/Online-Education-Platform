import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

// Signup function
export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists with the same email and role
        const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ? AND role = ?', [email, role]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: `User already exists with this email and role: ${role}.` });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await db.promise().query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
            [name, email, hashedPassword, role]);

        // Generate a JWT token
        const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User created successfully!', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Login function
export const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if the user exists with the provided email and role
        const [userRows] = await db.promise().query('SELECT * FROM users WHERE email = ? AND role = ?', [email, role]);
        const user = userRows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or role.' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
