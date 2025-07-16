const jwt = require('jsonwebtoken');
const { User, Course, Lesson } = require('../models/dbModels');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) res.status(401).json({ status: 'fail', message: 'Access token required' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-passwordHash');
    
    if (!user) res.status(401).json({ status: 'fail', message: 'Invalid token' });

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ status: 'fail', message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      res.status(401).json({ status: 'fail', message: 'Token expired' });
    } else {
      res.status(500).json({ status: 'error', message: 'Authentication error' });
    }
  }
};

// Middleware to check if user has required role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) res.status(401).json({ status: 'fail', message: 'Authentication required' });

    if (!roles.includes(req.user.role)) res.status(403).json({ status: 'fail', message: 'Insufficient permissions' });

    next();
  };
};

// Middleware to check if user is the course instructor
const authorizeInstructor = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { Course } = require('../models/updatedSchema');
    
    const course = await Course.findById(courseId);
    if (!course) res.status(404).json({ status: 'fail', message: 'Course not found' });

    if (course.instructorId.toString() !== req.user._id.toString()) {
      res.status(403).json({ status: 'fail', message: 'Only course instructor can perform this action' });
    }

    next();
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Authorization error' });
  }
};

// Middleware to check if user is enrolled in the course
const authorizeEnrollment = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { Enrollment } = require('../models/updatedSchema');
    
    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: courseId
    });

    if (!enrollment) {
      res.status(403).json({ status: 'fail', message: 'You must be enrolled in this course to access this resource' });
    }

    req.enrollment = enrollment;
    next();
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Authorization error' });
  }
};

const authorizeCourseOwner = async (req, res, next) => {
  try {
    // Try to get courseId from params, body, or lesson object
    let courseId = req.params.courseId || req.body.courseId || req.params.id;
    // For lesson update/delete, lessonId is in params.id, need to fetch lesson to get courseId
    if (!courseId && req.baseUrl.includes('lessons') && req.params.id) {
      const { Lesson } = require('../models/dbModels');
      const lesson = await Lesson.findById(req.params.id);
      if (!lesson) return res.status(404).json({ status: 'fail', message: 'Lesson not found' });
      courseId = lesson.courseId;
    }
    if (!courseId) return res.status(400).json({ status: 'fail', message: 'Course ID required' });
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ status: 'fail', message: 'Course not found' });
    if (course.instructorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'fail', message: 'Only the course owner can perform this action' });
    }
    next();
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Authorization error' });
  }
};

module.exports = {
  authenticateToken,
  authorizeRole,
  authorizeInstructor,
  authorizeEnrollment,
  authorizeCourseOwner
}; 