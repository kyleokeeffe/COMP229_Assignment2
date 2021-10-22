// let mongoose = require('mongoose');
//  let passportLocalMongoose = require('passport-local-mongoose');

//  let User = mongoose.Schema(
//      {
//          username: 
//          {
//              type: String, 
//              default: '', 
//              trim: true,
//              required: 'username is required'
//          },
//          //if had password would look like 
//          password:{
//              type: String,
//              default:'',
//              required: 'Password is requried'
//          },
//          email:{
//              type: String,
//              default:'',
//              required: 'Email is requried'
//          },
//         //  displayName:{
//         //      type: String,
//         //      default:'',
//         //      required: 'Display Name is requried'
//         //  },
//          created:{
//              type: Date,
//              default: Date.now         },
//          update:{
//              type: Date,
//              default: Date.now,
//              }
//      },
//      {
//          collection:"users"
//      }
//  );

//  //Configure options for model 
//  let options = ({ missingPasswordError: 'Wrong/Missing password'});
//  User.plugin(passportLocalMongoose, options);
//  module.exports.User = mongoose.model('User', User);


//Copied directly from week6 - authentication example class example

 let mongoose = require('mongoose');
let crypto = require('crypto');
let Schema = mongoose.Schema;

let UserSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        password: {
            type: String,
            validate: [(password) => {
                return password && password.length > 6;
            }, 'Password should be longer']
        },
        salt: {
            type: String
        },
        provider: {
            type: String,
            required: 'Provider is required'
        },
        providerId: String,
        providerData: {},
        created: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "user"
    }
);

UserSchema.virtual('fullName')
.get(function() {
    return this.firstName + ' ' + this.lastName;
})
.set(function(fullName) {
    let splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix,
    callback) {
    var possibleUsername = username + (suffix || '');
    this.findOne({
        username: possibleUsername
    }, (err, user) => {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return this.findUniqueUsername(username, (suffix || 0) +
                    1, callback);
            }
        } else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('User', UserSchema);