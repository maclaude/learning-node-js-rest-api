/**
 * NPM import
 */
const express = require('express');

/**
 * Local import
 */
// Controllers
const authController = require('../controllers/auth');
// Utils
const authValidation = require('../utils/auth-validation');

/**
 * Code
 */
const router = express.Router();

/**
 * Routes
 */
// PUT /auth/signup
router.put('/signup', authValidation.signup, authController.signup);

/**
 * Export
 */
module.exports = router;
