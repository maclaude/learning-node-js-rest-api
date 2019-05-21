/**
 * NPM import
 */
const mongoose = require('mongoose');

/**
 * Code
 */
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Object,
      required: true,
    },
  },
  // createdAt - updatedAt
  { timestamps: true }
);

/**
 * Export
 */
module.exports = mongoose.model('Post', postSchema);
