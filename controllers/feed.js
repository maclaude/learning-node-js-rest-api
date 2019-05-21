// Feed controller

/**
 * NPM Import
 */
const { validationResult } = require('express-validator/check');

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

  // @TODO - Create post in database

  return res.status(201).json({
    message: 'Post created',
    post: {
      _id: new Date().toISOString(),
      title,
      content,
      creator: { name: 'Marc-Antoine' },
      createdAt: new Date(),
    },
  });
};
