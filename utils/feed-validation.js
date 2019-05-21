// Feed validation

/**
 * NPM import
 */
const { body } = require('express-validator/check');

/**
 * Code
 */
exports.postPost = [
  body('title')
    .trim()
    .isLength({ min: 7 }),
  body('content')
    .trim()
    .isLength({ min: 10 }),
];
