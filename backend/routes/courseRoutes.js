const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { createCourseValidator } = require("../validation/courseValidator");
const validate = require("../middlewares/validate");

router.post(
  "/",
  createCourseValidator,
  validate,
  courseController.createCourse
);
router.get("/", courseController.getAllCourses);
router.get("/top", courseController.getTopCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
