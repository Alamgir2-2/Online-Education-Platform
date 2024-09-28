// const connection = require('../config/database');

// const User = {
//     create: (userData, callback) => {
//         const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
//         connection.query(sql, [userData.name, userData.email, userData.password, userData.role], callback);
//     }
// };

// module.exports = User;


const connection = require('../config/database');

const User = {
    findOne: (criteria, callback) => {
        const { email, role } = criteria.where;
        const sql = 'SELECT * FROM users WHERE email = ? AND role = ? LIMIT 1';
        connection.query(sql, [email, role], (err, result) => {
            if (err) return callback(err);
            callback(null, result[0]); // Return the first user found or null
        });
    },

    create: (userData, callback) => {
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        connection.query(sql, [userData.name, userData.email, userData.password, userData.role], (err, result) => {
            if (err) return callback(err);
            callback(null, { id: result.insertId, ...userData }); // Return new user details
        });
    }
};

module.exports = User;

