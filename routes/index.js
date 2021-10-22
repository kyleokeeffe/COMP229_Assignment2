// Filename:     index.js 
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 2, 2021 


var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHome);

/* GET about page. */
router.get('/about', indexController.displayAbout);

/* GET projects page. */
router.get('/projects', indexController.displayProjects) 

/* GET services page. */
router.get('/services', indexController.displayServices);

/* GET contact page. */
router.get('/contact', indexController.displayContact);



/* GET login page. */
router.get('/login', indexController.displayLogin);

/* POST login page. */
router.post('/login', indexController.processLogin);

/* GET logout  page. */
router.get('/logout', indexController.displayLogout);

module.exports = router;
