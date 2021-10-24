// Filename:     models/user.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 

//Import modules
let mongoose = require('mongoose');
let crypto = require('crypto');

//Configure Schema
let Schema = mongoose.Schema;

//Define schema for user collection
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

//Define function for creating virtual fullName attribute from fName and lName user attributes
UserSchema.virtual('fullName')
.get(function() {
    return this.firstName + ' ' + this.lastName;
})
.set(function(fullName) {
    let splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

//Generate salt value for use in hashPassword function, call hashPassword and assign to password 
UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

//Encrypt password using generated salt value
UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

//Compare saved encrypted password with inputted encrypted password
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

//Determine if inputted username is unique in user collection
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

//Serialize schema to json
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('User', UserSchema);
