// models/courseModel.js
import db from '../config/db.js';

const Course = {
    create: (courseData, callback) => {
        db.query('INSERT INTO courses SET ?', courseData, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
    getAll: (callback) => {
        db.query('SELECT * FROM courses', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    // Additional methods for update, delete, etc. can be added here
};

export default Course;
