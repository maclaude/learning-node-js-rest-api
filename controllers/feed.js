// Feed controller

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
  const { title, content } = req.body;

  // @TODO - Create post in database

  res.status(201).json({
    message: 'Post created',
    post: { id: new Date().toISOString(), title, content },
  });
};
