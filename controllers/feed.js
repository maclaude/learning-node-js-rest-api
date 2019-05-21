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
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array(),
    });
  }

  const { title, content } = req.body;

  const post = new Post({
    title,
    content,
    imageUrl: 'images/posca.jpeg',
    creator: { name: 'Marc-Antoine' },
  });

  return post
    .save()
    .then(response => {
      console.log(response);
      res.status(201).json({
        message: 'Post created',
        post: response,
      });
    })
    .catch(err => console.log(err));
};
