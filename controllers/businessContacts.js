// Connect the model
const businessContacts = require('../models/businessContacts');
let BusinessContacts = require('../models/businessContacts');


module.exports.list = function(req, res, next) {
    BusinessContacts.find(
        (err, businessContactsList)=>{
          if(err){
            return console.error(err);
          }else{
            // console.log("got it");
              res.render('businessContacts/list', { title: 'Business Contacts',
              BusinessContactsList: businessContactsList });
            
          }
        }
    ); 
}

