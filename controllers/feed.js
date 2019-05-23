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
const deleteFile = require('../utils/delete-file');

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
  // Request validation
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

exports.putPost = (req, res, next) => {
  const { postId } = req.params;

  // Request validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    // Throw error to exit the current fonction execution & reach the error middleware
    throw error;
  }

  const { title, content } = req.body;
  let { image: imageUrl } = req.body;

  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No image provided');
    error.statusCode = 422;
    throw error;
  }

  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find the requested post.');
        error.statusCode = 404;
        throw error;
      }

      // Deleting the image if it's been updated
      if (imageUrl !== post.imageUrl) {
        deleteFile(post.imageUrl);
      }

      const updatedPost = post;
      // Updating the post
      updatedPost.title = title;
      updatedPost.content = content;
      updatedPost.imageUrl = imageUrl;
      // Saving the updated post
      return updatedPost.save();
    })
    .then(response => {
      res.status(200).json({ message: 'Post updated', post: response });
    })
    .catch(errorHandler(next));
};

exports.deletePost = (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find the requested post.');
        error.statusCode = 404;
        throw error;
      }
      // @TODO: Check loggedIn user
      deleteFile(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(response => {
      console.log(response);
      res.status(200).json({ message: 'Post deleted', post: response });
    })
    .catch(errorHandler(next));
};
