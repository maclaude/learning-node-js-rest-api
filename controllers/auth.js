// Auth controller

/**
 * NPM import
 */
const { validationResult } = require('express-validator/check');

/**
 * Local import
 */
// Models
const User = require('../models/user');

/**
 * Code
 */
exports.signup = (req, res, next) => {
  // Request validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { name, email, password } = req.body;
};
