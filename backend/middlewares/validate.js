const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation Error:', errors.array(), 'Request Body:', req.body);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
