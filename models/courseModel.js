const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, default: 0 },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
