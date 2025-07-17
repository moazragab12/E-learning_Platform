const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedbackController.js');

router.post('/', controller.submitFeedback);
router.get('/course/:courseId', controller.getCourseFeedback);

module.exports = router;
