/*var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    local            : {
        firstName : String,
        lastName : String,
        email        : String,
        password     : String
    }
});

userSchema.methods.validPassword = function (pwd) {
    return (this.password === pwd);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
*/

var mongoose = require('mongoose');

//var crypto = require('crypto');

var userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    verifyFlag : Boolean,
    activationCode : String
});

userSchema.methods.validPassword = function (pwd) {
    return (this.password === pwd);
};

userSchema.methods.isUserVerified = function () {
    return this.verifyFlag;
};

module.exports = mongoose.model('User', userSchema);
