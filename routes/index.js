// Variables
const express = require('express');
const router = express.Router();
// Require the local datafile
const { projects } = require('../data/data.json');
/**
 * GET home page
 * Pass all recipe data to the index template
 */
router.get('/', (req, res) => {
    // Log out Projects route handler indication
    console.log('Home route called');
    res.render('index', { projects });
})
/**
 * GET about page
 */ 
router.get('/about', (req, res, next) => {
    // Log out About route handler indication
    console.log('About route called');
    res.render('about');
})
/**
 * GET generated error route - create and throw 500 server error
 */
router.get('/error', (req, res, next) => {
    // Log out custom error handler indication
    console.log('Custom error route called');
    const err = new Error();
    err.message = `Custom 500 error thrown`
    err.status = 500;
    throw err;
});
/**
 * GET individual project route
 * if project exists
 *  renders the project templete with the project by its id
 * else
 *  Creates a new 404 error
 *  Provides an error message
 *  Forwards the error to the global error handler
 */
router.get('/project/:id', (req, res, next) => {
    // Log quote handler indication
    console.log(`Project ${req.params.id} route called`);
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === projectId);
    console.log(project);
    if (project) {
        res.render('project', { project });
    } else {
        const err = new Error();
        err.status = 404;
        err.message = `Looks like the quote you requested doesn't exist.`
        next(err);
        }
});
/**
 *  Export router so it can be referenced in the app.js file
 */
module.exports = router;