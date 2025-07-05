const { body } = require("express-validator");

exports.createCourseValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("instructorId")
    .notEmpty()
    .withMessage("Instructor ID is required")
    .isMongoId()
    .withMessage("Instructor ID must be a valid Mongo ID"),

  body("categories").isArray().withMessage("Categories must be an array"),

  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be true or false"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];
