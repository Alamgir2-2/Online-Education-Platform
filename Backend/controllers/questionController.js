// controllers/questionController.js
import Question from '../models/questionModel.js';

const questionController = {
    createQuestion: (req, res) => {
        const { milestone_id, question_text, option_a, option_b, option_c, option_d, correct_answer } = req.body;

        const questionData = { milestone_id, question_text, option_a, option_b, option_c, option_d, correct_answer };

        Question.create(questionData, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Question created successfully', questionId: result.insertId });
        });
    },
    getQuestionsByMilestone: (req, res) => {
        const milestoneId = req.params.milestoneId;

        Question.getAllByMilestone(milestoneId, (err, questions) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(questions);
        });
    },
};

export default questionController;
