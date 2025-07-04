const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: String,
    questions: [
        {
            questionText: String,
            options: [String],
            correctAnswer: String
        }
    ]
});

module.exports = mongoose.model('Quiz', quizSchema);
