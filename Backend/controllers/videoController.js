// controllers/videoController.js
import Video from '../models/videoModel.js';

const videoController = {
    createVideo: (req, res) => {
        const { milestone_id, title, description, url, duration } = req.body;

        const videoData = { milestone_id, title, description, url, duration };

        Video.create(videoData, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Video created successfully', videoId: result.insertId });
        });
    },
    getVideosByMilestone: (req, res) => {
        const milestoneId = req.params.milestoneId;

        Video.getAllByMilestone(milestoneId, (err, videos) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(videos);
        });
    },
    getVideoById: (req, res) => {
        const videoId = req.params.videoId;

        Video.getById(videoId, (err, video) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(video);
        });
    },
    updateVideo: (req, res) => {
        const videoId = req.params.videoId;
        const videoData = req.body;

        Video.update(videoId, videoData, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ message: 'Video updated successfully' });
        });
    },
    deleteVideo: (req, res) => {
        const videoId = req.params.videoId;

        Video.delete(videoId, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ message: 'Video deleted successfully' });
        });
    },
};

export default videoController;
