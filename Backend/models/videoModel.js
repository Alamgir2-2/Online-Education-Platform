// models/videoModel.js
import db from '../config/db.js';

const Video = {
    create: (videoData, callback) => {
        db.query('INSERT INTO videos SET ?', videoData, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
    getAllByMilestone: (milestoneId, callback) => {
        db.query('SELECT * FROM videos WHERE milestone_id = ?', [milestoneId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getById: (videoId, callback) => {
        db.query('SELECT * FROM videos WHERE id = ?', [videoId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },
    update: (videoId, videoData, callback) => {
        db.query('UPDATE videos SET ? WHERE id = ?', [videoData, videoId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
    delete: (videoId, callback) => {
        db.query('DELETE FROM videos WHERE id = ?', [videoId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
};

export default Video;
