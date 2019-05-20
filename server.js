/**
 * NPM import
 */
const express = require('express');

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
// Routes
app.use('/feed', feedRoutes);

// Start ther server
app.listen(8000);
