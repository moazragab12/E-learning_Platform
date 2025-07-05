const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const { createLessonValidator } = require("../validation/lessonValidator");
const validate = require("../middlewares/validate");

router.post(
  "/",
  createLessonValidator,
  validate,
  lessonController.createLesson
);
router.get("/", lessonController.getAllLessons);
router.get("/:id", lessonController.getLessonById);
router.put("/:id", lessonController.updateLesson);
router.delete("/:id", lessonController.deleteLesson);

module.exports = router;
