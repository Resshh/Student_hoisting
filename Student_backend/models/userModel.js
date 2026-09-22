const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    rollNo: {
        type: Number,
        require: true
    },
    candidateName: {
        type: String,
        require: true
    },
    course: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    marks: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("User", userSchema);