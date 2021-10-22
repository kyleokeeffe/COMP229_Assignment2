// Filename:     index.js 
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 2, 2021 


var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHome);

/* GET about page. */
router.get('/about', indexController.displayAbout);

/* GET projects page. */
router.get('/projects', indexController.displayProjects);

/* GET services page. */
router.get('/services', indexController.displayServices);

module.exports = router;
