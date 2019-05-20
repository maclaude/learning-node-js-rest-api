/**
 * NPM import
 */
const express = require('express');

/**
 * Local import
 */
const feedController = require('../controllers/feed');

/**
 * Code
 */
const router = express.Router();

/**
 * Routes
 */
// GET /feed/posts
router.get('/posts', feedController.getPosts);
// POST /feed/post
router.post('/post', feedController.postPost);

/**
 * Export
 */
module.exports = router;
