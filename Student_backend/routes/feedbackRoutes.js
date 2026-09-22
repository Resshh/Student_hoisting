const express = require("express");
const router = express.Router();
const feedbackModel = require("../models/feedbackModel");



router.post("/", async (req, res) => {
    try {
        const feedback = new feedbackModel(req.body);
        await feedback.save();

        res.status(201).json({
            message: "Feedback Submitted Successfully",
            feedback,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});



router.get("/", async (req, res) => {
    try {
        const feedbacks = await feedbackModel.find();

        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});



router.get("/:email", async (req, res) => {
    try {
        const feedback = await feedbackModel.findOne({
            email: req.params.email,
        });

        if (!feedback) {
            return res.status(404).json({
                message: "Feedback Not Found",
            });
        }

        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;