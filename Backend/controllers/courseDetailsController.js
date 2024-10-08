import { unflatten } from 'flat';
import Course from '../models/courseModel.js';
import Milestone from '../models/milestoneModel.js';
import Question from '../models/questionModel.js';
import Video from '../models/videoModel.js';
import db from '../config/db.js'

const courseDetailsController = {
    handleRequest:  (req, res) => {
        try {
            // Extracting body and checking if it exists
            let { courseTitle, description, ...milestones } = req.body || {};

            // Check for required fields
            if (!courseTitle || !description || !milestones) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Step 1: Insert into the Course table
            const courseQuery = `
                INSERT INTO courses (title, description, instructor_id, created_at, updated_at)
                VALUES ('${courseTitle}', '${description}', 1, NOW(), NOW());
            `;
             db.query(courseQuery);

            // Step 2: Get the last inserted Course ID
            const [courseIdResult] =  db.query('SELECT LAST_INSERT_ID() AS lastId');
            const courseId = courseIdResult[0].lastId; // Retrieve the last inserted ID for the course
            console.log('Inserted Course ID:', courseId);

            milestones = unflatten(milestones).milestones; // Unflatten the milestones

            // Loop through milestones and insert them
            for (const milestone of milestones) {
                const milestoneQuery = `
                    INSERT INTO milestones (course_id, title, description, \`order\`, created_at, updated_at)
                    VALUES (${courseId}, '${milestone.title}', '${milestone.description || ''}', ${milestone.order || 1}, NOW(), NOW());
                `;
                const milestoneResult =  db.query(milestoneQuery);

                // Step 3: Get the last inserted Milestone ID
                const milestoneId = milestoneResult.insertId; // This is a direct way to get the milestone ID
                console.log('Inserted Milestone ID:', milestoneId);

                // Step 4: Insert videos linked to this milestone
                for (const video of milestone.videos) {
                    const videoFile = req.files[`milestones[${milestones.indexOf(milestone)}][videos][${milestone.videos.indexOf(video)}][file]`]
                        ? req.files[`milestones[${milestones.indexOf(milestone)}][videos][${milestone.videos.indexOf(video)}][file]`][0]
                        : null;

                    const videoUrl = videoFile ? videoFile.filename : null; // Use filename from multer if exists

                    const videoQuery = `
                        INSERT INTO videos (milestone_id, title, description, duration, video_url, created_at, updated_at)
                        VALUES (${milestoneId}, '${video.title}', '${video.description || ''}', ${video.duration || 0}, '${videoUrl || null}', NOW(), NOW());
                    `;
                    const videoResult =  db.query(videoQuery);

                    // Step 5: Get the last inserted Video ID
                    const videoId = videoResult.insertId; // This is a direct way to get the video ID
                    console.log('Inserted Video ID:', videoId);

                    // Step 6: Insert questions linked to this video
                    for (const question of video.questions) {
                        const questionQuery = `
                            INSERT INTO questions (video_id, question_text, option_a, option_b, option_c, option_d, correct_answer, created_at, updated_at)
                            VALUES (${videoId}, '${question.text || ''}', '${question.options[0] || ''}', '${question.options[1] || ''}', '${question.options[2] || ''}', '${question.options[3] || ''}', '${question.correctOption || ''}', NOW(), NOW());
                        `;
                         db.query(questionQuery);
                    }
                }
            }

            // Send success response
            res.status(201).json({ message: 'Data inserted successfully' });
        } catch (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Error inserting data', error: err.message });
        }
    }
};


  
    


export default courseDetailsController;
