// const User = require('../models/User');

// const signup = (req, res) => {
//     const { name, email, password, role } = req.body;

//     // Check if email already exists for the same role
//     User.findOne({ where: { email, role } })
//         .then(existingUser => {
//             if (existingUser) {
//                 return res.status(400).json({
//                     error: `User already has a ${role === 'student' ? 'student' : 'instructor'} account.`,
//                 });
//             }

//             // Create a new user if email is not used for the same role
//             User.create({ name, email, password, role })
//                 .then(results => {
//                     res.status(201).json({
//                         message: 'User registered successfully',
//                         userId: results.insertId,
//                     });
//                 })
//                 .catch(err => {
//                     return res.status(500).json({ error: 'Database error' });
//                 });
//         })
//         .catch(err => {
//             return res.status(500).json({ error: 'Database error' });
//         });
// };

// module.exports = { signup };
