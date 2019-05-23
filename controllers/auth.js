// Auth controller

/**
 * NPM import
 */
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

/**
 * Local import
 */
// Models
const User = require('../models/user');
// Utils
const errorHandler = require('../utils/error-handler');

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

  // Encrypting password
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      // Creating new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      return newUser.save();
    })
    .then(response => {
      res.status(201).json({ message: 'User created', userId: response._id });
    })
    .catch(errorHandler(next));
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        const error = new Error('No user found with this email.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      // Comparing passwords
      return bcrypt.compare(password, user.password);
    })
    .then(passwordsMatched => {
      if (!passwordsMatched) {
        const error = new Error('Passwords do not matched');
        error.statusCode = 404;
        throw error;
      }
    })
    .catch(errorHandler(next));
};
