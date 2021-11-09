// Filename:     routes/businessContacts.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 

//Import external module
var express = require('express');

//configure router
var router = express.Router();

// Controller access
let businessContactsController = require('../controllers/businessContacts');
const { startSession } = require('../models/businessContacts');

//Function for limiting access to routes if user is not authenticated
function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())// check if the user is logged in
    {
        req.session.url = req.originalUrl;
        return res.redirect('/user/signin');//if not, redirect to signin page
    }
    next();
}

/* GET Business contacts page. */
router.get('/list', requireAuth,businessContactsController.list);

/* GET Business contacts edit page. */
router.get('/edit/:id', requireAuth,businessContactsController.displayEdit);

/* POST Business contacts edit page. */
router.post('/edit/:id',     requireAuth,businessContactsController.validate('processEdit'),businessContactsController.processEdit);

/* GET Business contacts add page. */
router.get('/add', requireAuth,businessContactsController.displayAdd);

/* POST Business contacts add page. */
router.post('/add', requireAuth,businessContactsController.validate('processEdit'),businessContactsController.processAdd);

/* GET Business contacts add page. */
router.get('/delete/:id', requireAuth,businessContactsController.performDelete);

module.exports = router;
