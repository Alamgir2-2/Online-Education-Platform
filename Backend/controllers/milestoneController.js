// controllers/milestoneController.js
import Milestone from '../models/milestoneModel.js';

const milestoneController = {
    createMilestone: (req, res) => {
        const { course_id, title, description } = req.body;

        const milestoneData = { course_id, title, description };

        Milestone.create(milestoneData, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Milestone created successfully', milestoneId: result.insertId });
        });
    },
    getMilestonesByCourse: (req, res) => {
        const courseId = req.params.courseId;

        Milestone.getAllByCourse(courseId, (err, milestones) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(milestones);
        });
    },
};

export default milestoneController;
