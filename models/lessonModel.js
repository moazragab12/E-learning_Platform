const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: String,
    content: String,
    duration: Number,    // in minutes
    order: Number
});

module.exports = mongoose.model('Lesson', lessonSchema);
