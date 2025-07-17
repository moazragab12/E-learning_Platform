const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const { createLessonValidator } = require("../validation/lessonValidator");
const validate = require("../middlewares/validate");
const { authenticateToken, authorizeRole, authorizeCourseOwner } = require("../middlewares/auth");

// Public: View lessons
router.get("/", lessonController.getAllLessons);
router.get("/:id", lessonController.getLessonById);

// Protected: Only instructors can create, update, delete
router.post(
  "/",
  authenticateToken,
  authorizeRole('instructor'),
  authorizeCourseOwner,
  createLessonValidator,
  validate,
  lessonController.createLesson
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole('instructor'),
  authorizeCourseOwner,
  lessonController.updateLesson
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole('instructor'),
  authorizeCourseOwner,
  lessonController.deleteLesson
);

module.exports = router;
