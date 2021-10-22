// Filename:     index.js 
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 2, 2021 

let express = require('express');
let router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;
