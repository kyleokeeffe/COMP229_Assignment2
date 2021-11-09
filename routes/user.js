// Filename:     routes/index.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 

//import external modules
let express = require('express');
let usersController = require('../controllers/user');
let passport = require('passport');

//configure router
let router = express.Router();

/* GET users listing. */
router.get('/', usersController.listUsers);

/* GET signup page. */
router.get('/signup', usersController.renderSignup);
/* POST signup page. */
router.post('/signup',usersController.validate('processRegister'),usersController.signup);

/* GET signin page. */
router.get('/signin', usersController.renderSignin);
/* POST signin page . */
router.post('/signin', usersController.signin);

/* GET signout page . */
router.get('/signout', usersController.signout);

module.exports = router;
