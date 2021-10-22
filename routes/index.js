// Filename:     index.js 
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 2, 2021 


var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', username: req.user ? req.user.username : '' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Me', username: req.user ? req.user.username : '' });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects', username: req.user ? req.user.username : '' });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services', username: req.user ? req.user.username : '' });
});

/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
