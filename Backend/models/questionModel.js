// models/questionModel.js
import db from '../config/db.js';

const Question = {
    create: (questionData, callback) => {
        db.query('INSERT INTO questions SET ?', questionData, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
    getAllByMilestone: (milestoneId, callback) => {
        db.query('SELECT * FROM questions WHERE milestone_id = ?', [milestoneId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    // Additional methods for update, delete, etc. can be added here
};

export default Question;
