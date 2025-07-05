const { body } = require("express-validator");

exports.createLessonValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("courseId")
    .notEmpty()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("Invalid Course ID"),
  body("order").isNumeric().withMessage("Order must be a number"),
  body("resources").isArray().withMessage("Resources must be an array"),
];
