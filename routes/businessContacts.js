// Filename:     index.js 
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 2, 2021 

var express = require('express');
var router = express.Router();
// Controller access
let businessContactsController = require('../controllers/businessContacts');
const { startSession } = require('../models/businessContacts');







/* GET Business contacts page. */
router.get('/list', businessContactsController.list);
// router.get('/list', function(req,res,next){BusinessContacts.find(
//   (err, businessContactsList)=>{
//     if(err){
//       return console.error(err);
//     }else{
//       console.log(businessContactsList);
//         // res.render('businessContacts/list', { title: 'Business Contacts',
//         // BusinessContactsList: businessContactsList });
      
//     }
//   }
// )});


/* GET Business contacts edit page. */
router.get('/edit', function(req, res, next) {
  res.render('businessContacts/add_edit', { title: 'Edit Contact' });
});

/* GET Business contacts add page. */
router.get('/add', businessContactsController.add);

module.exports = router;
