const express = require('express');
const app = express();
const cors = require('cors');

module.exports = app;

// Add middleware for handling CORS requests from index.html
app.use(cors())

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// Middleware for handling errors
const errorhandler = require('errorhandler')
app.use(errorhandler())
// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter)

