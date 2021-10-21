// Filename:     index.js 
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 2, 2021 

var express = require('express');
var router = express.Router();

/* GET Business contacts page. */
router.get('/', function(req, res, next) {
  res.render('businessContacts', { title: 'Business Contacts' });
});

module.exports = router;
