// Filename:     routes/index.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 

//import external module
var express = require('express');

//configure router
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',
  userName: req.user ? req.user.username : '' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Me',
  userName: req.user ? req.user.username : '' });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects',
  userName: req.user ? req.user.username : '' });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services',
  userName: req.user ? req.user.username : '' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact',
  userName: req.user ? req.user.username : '' });
});

module.exports = router;
