// Feed controller

/**
 * NPM import
 */
const { validationResult } = require('express-validator/check');

/**
 * Local import
 */
// Models
const Post = require('../models/post');
// Utils
const errorHandler = require('../utils/error-handler');

/**
 * Code
 */
exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      if (!posts) {
        const error = new Error('Could not find the requested posts.');
        error.statusCode = 404;
        // An error thrown in a then, will reach the catch as an argument
        throw error;
      }
      // Sending the response
      res.status(200).json({ message: 'Posts fetched', posts });
    })
    .catch(errorHandler(next));
};

exports.getPost = (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find the requested post.');
        error.statusCode = 404;
        // An error thrown in a then, will reach the catch as an argument
        throw error;
      }
      // Sending the response
      res.status(200).json({ message: 'Post fetched', post });
    })
    .catch(errorHandler(next));
};

exports.postPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    // Throw error to exit the current fonction execution & reach the error middleware
    throw error;
  }

  if (!req.file) {
    const error = new Error('No image provided');
    error.statusCode = 422;
    throw error;
  }

  const { title, content } = req.body;
  const imageUrl = req.file.path;

  const post = new Post({
    title,
    content,
    imageUrl,
    creator: { name: 'Marc-Antoine' },
  });

  post
    .save()
    .then(response => {
      console.log(response);
      // Sending the response
      res.status(201).json({
        message: 'Post created',
        post: response,
      });
    })
    .catch(errorHandler(next));
};
