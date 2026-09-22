const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    course: {
        type: String,
        require: true
    },
    feedback: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);