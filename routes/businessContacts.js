// Filename:     index.js 
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 2, 2021 

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

let passport = require('passport');

// Controller access
let businessContactsController = require('../controllers/businessContacts');


//const { startSession } = require('../models/businessContacts');

function requireAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}






/* GET Business contacts page. */
router.get('/list', requireAuth, businessContactsController.list);


/* GET Business contacts edit page. */
router.get('/edit/:id', requireAuth, businessContactsController.displayEdit);

/* POST Business contacts edit page. */
router.post('/edit/:id', requireAuth, businessContactsController.processEdit);


/* GET Business contacts add page. */
router.get('/add', requireAuth, businessContactsController.displayAdd);

/* POST Business contacts add page. */
router.post('/add', requireAuth, businessContactsController.processAdd);

/* GET Business contacts add page. */
router.get('/delete/:id', requireAuth, businessContactsController.performDelete);

module.exports = router;
