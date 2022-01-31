// Variables
const express = require('express');
const app = express();
// Module which can be used when setting the absolute path in the express.static function.
const path = require('path');
// Import route definitions
const indexRouter = require('./routes/index.js');
// For remote port
const port = process.env.PORT || 3000; // default
/**
 * Setup view engine
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/**
 * Express middleware for accessing the req.body
 */ 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/**
 * Static middleware for serving static files using the absolute path of the directory
 */
app.use('/static', express.static(path.join(__dirname, 'public')))
/**
 * Use route definitions
 */
app.use('/', indexRouter);

/* ERROR HANDLERS */

/**
 * 404 handler to catches undefined or non-existent route requests
 */
app.use((req, res, next) => {
    console.log('404 error handler called log from app.js');
    /**
     * Sends a response to the client
     * Sets the response status to 404
     * Renders the 'not-found' view
     */ 
    res.status(404).render('not-found');
});
/**
 * Global error handler
 */ 
app.use((err, req, res, next) => {
    if (err) {
        console.log('Global error handler called', err);
    }
    /**
     * Handles errors caught by your route handlers
     * if the error status is 404:
     *  Sets the response status to 404
     *  Renders the 'not-found' view and pass the error object to the view
     * else
     *  Sets the error message to the given message, or specify a general, 
            default error message
     *  Renders the 'error' view, passing it the error object   
     */
    if (err.status === 404) {
      res.status(404).render('not-found', { err });
    } else {
      err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
      res.status(err.status || 500).render('error', { err });
    }
  });
/**
 * Function that is used to bind and listen the connections on the
 * specified host and port
 */
app.listen(port, () => {
  console.log('The application is running on localhost:3000');
});