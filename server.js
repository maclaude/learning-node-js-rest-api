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

// Routes
app.use('/feed', feedRoutes);

// Start ther server
app.listen(8000);
