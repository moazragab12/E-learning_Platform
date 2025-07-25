const { Feedback } = require('../models/dbModels');

exports.submitFeedback = async (req, res) => {
  try {
    const { userId, courseId, lessonId, rating, comment } = req.body;

    const feedback = new Feedback({
      userId,
      courseId,
      lessonId,
      rating,
      comment
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseFeedback = async (req, res) => {
  try {
    const { courseId } = req.params;

    const feedbacks = await Feedback.find({ courseId })
      .populate('userId', 'profile.firstName profile.lastName')
      .populate('lessonId', 'title');

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
