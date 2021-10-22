let express = require('express');
let router = express.Router();

let passport = require('passport');

let usersController = require('../controllers/users');


router.get('/login', usersController.displayLogin);
router.post('/login', usersController.processLogin);

router.get('/logout', usersController.displayLogout);

module.exports = router;
