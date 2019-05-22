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

/**
 * Code
 */
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'Posca !',
        content: 'What a great marker !',
        imageURL: 'images/posca.jpeg',
        creator: {
          name: 'Marc-Antoine',
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.postPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    // Throw error to exit the current fonction execution & reach the error middleware
    throw error;
  }

  const { title, content } = req.body;

  const post = new Post({
    title,
    content,
    imageUrl: 'images/posca.jpeg',
    creator: { name: 'Marc-Antoine' },
  });

  post
    .save()
    .then(response => {
      console.log(response);
      res.status(201).json({
        message: 'Post created',
        post: response,
      });
    })
    .catch(err => {
      const error = err;
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      // Use of next inside of a promise to reach the error middleware
      next(error);
    });
};
