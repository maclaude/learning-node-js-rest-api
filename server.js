/**
 * NPM import
 */
const express = require('express');
const bodyParser = require('body-parser');

/**
 * Local import
 */
// Routes
const feedRoutes = require('./routes/feed');

/**
 * Code
 */
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

// Start ther server
app.listen(8000);
