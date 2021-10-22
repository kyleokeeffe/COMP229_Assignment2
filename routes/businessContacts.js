// Filename:     index.js 
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 2, 2021 

let express = require('express');
let router = express.Router();
// Controller access
let businessContactsController = require('../controllers/businessContacts');
// const { startSession } = require('../models/businessContacts');


// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/login');
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
