// controllers/blogController.js
import mysql from 'mysql2/promise';

import db from '../config/db.js'

// // Controller function to create a blog
// export const createBlog = async (req, res) => {
//   try {
//     const { title, content, instructor_id } = req.body;
//     const imageUrl = req.file ? req.file.path : null; // Get the image path from the uploaded file
//     console.log('Uploaded file:', req.file);


//     const [result] = await db.execute(
//       'INSERT INTO blog (title, content, image_url, instructor_id, created_at, updated_at, status) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)',
//       [title, content, imageUrl, instructor_id, 'draft'] // Change status as needed
//     );

//     res.status(201).json({ message: 'Blog created successfully!', id: result.insertId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating blog', error: error.message });

//     console.log('Request body:', req.body);
//     console.log('File info:', req.file);
//     console.log('Inserting into DB:', { title, content, imageUrl, instructor_id });
//   }
// };


// export const createBlog = async (req, res) => {
//   try {
//     const { title, content, instructor_id } = req.body;
//     const imageUrl = req.file ? req.file.path : null; // Get the image path from the uploaded file
    
//     console.log('Uploaded file:', req.file);
//     console.log('Parameters:', title, content, imageUrl, instructor_id); // Log the parameters

//     const [result] = await db.execute(
//       'INSERT INTO blog (title, content, image_url, instructor_id, created_at, updated_at, status) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)',
//       [title, content, imageUrl, instructor_id, 'draft'] // Change status as needed
//     );

//     res.status(201).json({ message: 'Blog created successfully!', id: result.insertId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating blog', error: error.message });
    
//     console.log('Request body:', req.body);
//     console.log('File info:', req.file);
//   }
// };



// controllers/blogController.js
// import mysql from 'mysql2/promise';
// import db from '../config/db.js'

// Controller function to create a blog
export const createBlog = async (req, res) => {
  try {
    const { courseTitle, description, milestones } = req.body;

    // Step 1: Insert into the Course table
    const [courseResult] = await db.execute(
      'INSERT INTO Course (title, description, instructor_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [courseTitle, description, 1] // assuming instructor_id = 1 for demo
    );
    const courseId = courseResult.insertId;

    // Step 2: Insert into the Milestones table
    for (const milestone of milestones) {
      const [milestoneResult] = await db.execute(
        'INSERT INTO milestones (course_id, title, description, `order`, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [courseId, milestone.title, milestone.description || '', milestone.order || 1] // Insert milestone data
      );
      const milestoneId = milestoneResult.insertId;

      // Step 3: Insert videos linked to this milestone
      for (const video of milestone.videos) {
        const [videoResult] = await db.execute(
          'INSERT INTO videos (milestone_id, title, description, duration, video_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
          [
            milestoneId,
            video.title,
            video.description || '',
            video.duration || 0,
            video.file || 'null', // Assuming video.file is the URL
          ]
        );
        const videoId = videoResult.insertId;

        // Step 4: Insert questions linked to this video
        for (const question of video.questions) {
          await db.execute(
            'INSERT INTO questions (video_id, question_text, option_a, option_b, option_c, option_d, correct_answer, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [
              videoId,
              question.text || '',
              question.options[0] || '',
              question.options[1] || '',
              question.options[2] || '',
              question.options[3] || '',
              question.correctOption || '',
            ]
          );
        }
      }
    }

    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error inserting data', error: err.message });
  }
};
