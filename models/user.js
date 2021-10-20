let mongoose = require('mongoose');
 let passportLocalMongoose = require('passport-local-mongoose');

 let User = mongoose.Schema(
     {
         username: 
         {
             type: String, 
             default: '', 
             trim: true,
             required: 'username is required'
         },
         //if had password would look like 
         password:{
             type: String,
             default:'',
             required: 'Password is requried'
         },
         email:{
             type: String,
             default:'',
             required: 'Email is requried'
         },
         displayName:{
             type: String,
             default:'',
             required: 'Display Name is requried'
         },
         created:{
             type: Date,
             default: Date.now         },
         update:{
             type: Date,
             default: Date.now,
             }
     },
     {
         collection:"users"
     }
 );

 //Configure options for model 
 let options = ({ missingPasswordError: 'Wrong/Missing password'});
 User.plugin(passportLocalMongoose, options);
 module.exports.User = mongoose.model('User', User);