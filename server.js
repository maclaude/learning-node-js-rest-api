/**
 * NPM import
 */
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

/**
 * Local import
 */
// Routes
const feedRoutes = require('./routes/feed');

/**
 * Code
 */
// Environment variables
dotenv.config();

// Initialize express
const app = express();

/**
 * Middlewares
 */
// Parser (Parsing the incoming JSON data)
// ! This middleware should always be placed first
app.use(bodyParser.json());

// Setting response CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/feed', feedRoutes);

/**
 * Database connexion with Mongoose
 */
// Database password
const { DB_PASSWORD } = process.env;

// Database URI
const DB_URI = `mongodb+srv://maclaude:${DB_PASSWORD}@node-js-qfuuy.mongodb.net/blog?retryWrites=true`;

mongoose
  .connect(DB_URI, { useNewUrlParser: true })
  .then(response => {
    console.log('Connected');
    // Start the server
    app.listen(8000);
  })
  .catch(err => console.log(err));
