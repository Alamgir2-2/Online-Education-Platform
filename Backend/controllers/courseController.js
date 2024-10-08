// controllers/courseController.js
import Course from '../models/courseModel.js';

const courseController = {
    createCourse: (req, res) => {
        const { name, description } = req.body;

        const courseData = { name, description };

        Course.create(courseData, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Course created successfully', courseId: result.insertId });
        });
    },
    getAllCourses: (req, res) => {
        Course.getAll((err, courses) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(courses);
        });
    },
};

export default courseController;
