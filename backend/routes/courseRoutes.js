const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { createCourseValidator } = require("../validation/courseValidator");
const validate = require("../middlewares/validate");
const { authenticateToken, authorizeRole, authorizeCourseOwner } = require("../middlewares/auth");

router.post(
  "/",
  authenticateToken,
  authorizeRole('instructor'),
  createCourseValidator,
  validate,
  courseController.createCourse
);
router.get("/", courseController.getAllCourses);
router.get("/top", courseController.getTopCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", authenticateToken, authorizeRole('instructor'), authorizeCourseOwner, courseController.updateCourse);
router.delete("/:id", authenticateToken, authorizeRole('instructor'), authorizeCourseOwner, courseController.deleteCourse);

module.exports = router;
