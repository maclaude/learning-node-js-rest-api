/**
 * NPM import
 */
const express = require('express');

/**
 * Local import
 */
// Controllers
const feedController = require('../controllers/feed');
// Utils
const feedValidation = require('../utils/feed-validation');

/**
 * Code
 */
const router = express.Router();

/**
 * Routes
 */
// GET /feed/posts
router.get('/posts', feedController.getPosts);
// GET /feed/post/:postId
router.get('/post/:postId', feedController.getPost);
// POST /feed/post
router.post('/post', feedValidation.postPost, feedController.postPost);
// PUT /feed/post/:postId
router.put('/post/:postId', feedValidation.putPost, feedController.putPost);
// DELETE /feed/post/:postId
router.delete('/post/:postId', feedController.deletePost);

/**
 * Export
 */
module.exports = router;
