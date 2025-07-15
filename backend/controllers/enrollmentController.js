const { Enrollment } = require('../models/dbModels');

exports.enrollUser = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ message: 'User already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      userId,
      courseId,
      progress: {
        lessonsCompleted: [],
        lastAccessed: new Date()
      }
    });

    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserEnrollments = async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollments = await Enrollment.find({ userId })
      .populate('courseId', 'title description categories')
      .populate('progress.lessonsCompleted', 'title');

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
