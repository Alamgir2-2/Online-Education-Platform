const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you are using Sequelize for MySQL

const signup = (req, res) => {
    const { name, email, password, role } = req.body;

    // Check if email already exists for the same role
    User.findOne({ where: { email, role } })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({
                    error: `User already has an account with the email ${email} for the role ${role}.`,
                });
            }

            // If no user found, hash the password and create the user
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ error: 'Error hashing the password.' });
                }

                // Create a new user
                User.create({ name, email, password: hashedPassword, role })
                    .then(newUser => {
                        res.status(201).json({
                            message: 'User registered successfully',
                            userId: newUser.id,
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({ error: 'Database error: ' + err.message });
                    });
            });
        })
        .catch(err => {
            return res.status(500).json({ error: 'Database error: ' + err.message });
        });
};

module.exports = { signup };
