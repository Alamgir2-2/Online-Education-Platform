import db from '../config/db.js';
import multer from 'multer';

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' }); // You can change the destination path

// Course upload handler
export const uploadCourse = async (req, res) => {

      console.log('Request body:', req.body); // Log request body
  console.log('Uploaded files:', req.files); // Log uploaded files
  const {
    courseName,
    courseDescription,
    milestones,
  } = req.body;

  const thumbnail = req.files.find(file => file.fieldname === 'thumbnail');

  try {
    const { courseName, courseDescription, milestoneTitle, videoTitle, question, options, answer } = req.body;
        // Process the data and insert into the database
        // Example:
        const [result] = await db.query("INSERT INTO courses (title, description) VALUES (?, ?)", [courseName, courseDescription]);
        const courseId = result.insertId;

    // Handle each milestone
    for (let i = 0; i < milestones.length; i++) {
      const milestone = milestones[i];

      // Insert milestone data into `milestones` table
      const [milestoneResult] = await connection.query(
        'INSERT INTO milestones (course_id, title, description, `order`, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [courseId, milestone.title, '', i + 1]
      );
      const milestoneId = milestoneResult.insertId;

      // Handle each video within the milestone
      for (let j = 0; j < milestone.videos.length; j++) {
        const video = milestone.videos[j];
        const videoFile = req.files.find(file => file.fieldname === `video_${i}_${j}`);

        // Insert video data into `videos` table
        const [videoResult] = await connection.query(
          'INSERT INTO videos (milestone_id, title, description, video_url, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
          [milestoneId, video.videoTitle, '', videoFile ? videoFile.filename : '']
        );

        const videoId = videoResult.insertId;

        // Insert questions related to this video into `questions` table
        const [questionResult] = await connection.query(
          'INSERT INTO questions (video_id, question_text, option_a, option_b, option_c, option_d, correct_answer, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
          [
            videoId,
            video.question,
            video.options[0],
            video.options[1],
            video.options[2],
            video.options[3],
            video.answer,
          ]
        );
      }
    }

    res.status(201).json({ message: 'Course uploaded successfully' });
  } catch (error) {
    console.error('Error uploading course:', error);
    res.status(500).json({ message: 'Failed to upload course' });
  }
};

// Export multer upload middleware
export const uploadMiddleware = upload.any();
