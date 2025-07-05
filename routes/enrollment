const express = require('express');
const router = express.Router();
const controller = require('../controllers/enrollmentController');

router.post('/enroll', controller.enrollUser);
router.get('/user/:userId', controller.getUserEnrollments);

module.exports = router;
