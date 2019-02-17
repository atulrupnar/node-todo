// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');
mongoose.connect(process.env.MONGODB_URI); // connect to our database

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
    },
    function(email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ email :  email }, function(err, user) {
                // if there are any errors, return the error
                console.log(err, user);
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, 'Account not exists'); //No user found.

                if (!user.isUserVerified()) {
                    return done(null, false, 'Please activate your account first'); //'Account Not Validated'
                }

                if (!user.validPassword(password))
                    return done(null, false, 'Email and password are not matching'); //'Oops! Wrong password.'

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));
}