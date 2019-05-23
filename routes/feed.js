/**
 * NPM import
 */
const express = require('express');

/**
 * Local import
 */
// Controllers
const feedController = require('../controllers/feed');
// Checking authentication middleware
const isAuth = require('../middlewares/is-auth');
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
router.get('/posts', isAuth, feedController.getPosts);
// GET /feed/post/:postId
router.get('/post/:postId', isAuth, feedController.getPost);
// POST /feed/post
router.post('/post', isAuth, feedValidation.postPost, feedController.postPost);
// PUT /feed/post/:postId
router.put(
  '/post/:postId',
  isAuth,
  feedValidation.putPost,
  feedController.putPost
);
// DELETE /feed/post/:postId
router.delete('/post/:postId', isAuth, feedController.deletePost);

/**
 * Export
 */
module.exports = router;
