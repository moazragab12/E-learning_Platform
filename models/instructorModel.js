const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bio: String,
    expertise: [String]
});

module.exports = mongoose.model('Instructor', instructorSchema);
