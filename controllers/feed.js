// Feed controller

/**
 * Code
 */
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: 'First post', content: 'This is the first post' }],
  });
};

exports.postPost = (req, res, next) => {
  const { title, content } = req.body;

  // @TODO - Create post in database

  res.status(201).json({
    message: 'Post created',
    post: { id: new Date().toISOString(), title, content },
  });
};
