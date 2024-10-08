// models/milestoneModel.js
import db from '../config/db.js';

const Milestone = {
    create: (milestoneData, callback) => {
        db.query('INSERT INTO milestones SET ?', milestoneData, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
    getAllByCourse: (courseId, callback) => {
        db.query('SELECT * FROM milestones WHERE course_id = ?', [courseId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    // Additional methods for update, delete, etc. can be added here
};

export default Milestone;
