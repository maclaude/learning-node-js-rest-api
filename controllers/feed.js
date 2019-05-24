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
const User = require('../models/user');
// Utils
const errorHandler = require('../utils/error-handler');
const deleteFile = require('../utils/delete-file');

/**
 * Code
 */
exports.getPosts = (req, res, next) => {
  // if page is undefined set value to 1
  const currentPage = req.query.page || 1;
  const POST_PER_PAGE = 2;
  let totalItems;

  Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return (
        Post.find()
          // Skipping posts of previous pages
          .skip((currentPage - 1) * POST_PER_PAGE)
          // Limit of posts we want to retrieve
          .limit(POST_PER_PAGE)
      );
    })
    .then(posts => {
      // Sending the response
      res.status(200).json({ message: 'Posts fetched', posts, totalItems });
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
    error.data = errors.array();
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

  const newPost = new Post({
    title,
    content,
    imageUrl,
    creator: req.userId,
  });

  // Init creator variable
  let creator;

  newPost
    .save()
    .then(response => User.findById(req.userId))
    .then(user => {
      creator = user;
      // Adding the new post to the user's post array
      user.posts.push(newPost);
      // Saving the updated user
      return user.save();
    })
    .then(response => {
      // Sending the response
      res.status(201).json({
        message: 'Post created',
        post: newPost,
        creator: { _id: creator._id, name: creator.name },
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
    error.data = errors.array();
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

      // Checking if the creator of the post is the logged in user
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized to update the post');
        error.statusCode = 403;
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

      // Checking if the creator of the post is the logged in user
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized to update the post');
        error.statusCode = 403;
        throw error;
      }

      deleteFile(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(response => {
      // Finding the user creator of the post
      return User.findById(req.userId);
    })
    .then(user => {
      // Removing the post id relation with this user
      user.posts.pull(postId);
      return user.save();
    })
    .then(response => {
      // Sending the response
      res.status(200).json({ message: 'Post deleted' });
    })
    .catch(errorHandler(next));
};

exports.getUserStatus = (req, res, next) => {
  const { userId } = req;

  User.findById({ _id: userId })
    .then(user => {
      if (!user) {
        const error = new Error('No user found with this userId.');
        error.statusCode = 401;
        throw error;
      }
      // Sending the response
      res.status(200).json({ status: user.status });
    })
    .catch(errorHandler(next));
};

exports.patchUserStatus = (req, res, next) => {
  const { userId } = req;
  const { status: newStatus } = req.body;

  User.findById({ _id: userId })
    .then(user => {
      if (!user) {
        const error = new Error('No user found with this userId.');
        error.statusCode = 401;
        throw error;
      }
      // Updating the user status
      const updatedUser = user;
      updatedUser.status = newStatus;
      return updatedUser.save();
    })
    .then(response => {
      // Sending the response
      res.status(200).json({ message: 'User status updated' });
    })
    .catch(errorHandler(next));
};
