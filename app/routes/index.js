var express = require('express');
var router = express.Router();
var helper = require('./helper');
var passport = require('passport');
var db = require('./../config/db');

router.post('/signup', function(req, res) {
	let input = req.body.input;
	console.log('start : signup')
	console.log(input)
	var collection = db.getCollection('users');
	collection.findOne({email : input.email}, function(err, result) {
		if (result) {
			return res.send({status : false, error :
				{errorCode : 'AccountExists', msg : 'Account Already Exists'}});
		}
		input.phrase = input.password;
		collection.save(input, function (err, docs) {
		    if (err) {
				return res.send({status : false, error : {
					errorCode : 'DBError', msg : 'DB Error'
				}});
		    }
			return res.send({status : true});
		});
	});
});

router.post('/login', passport.authenticate('local-login', {
            failureRedirect : '/login'
        }), function(req, res) {
	console.log('login : start')
	let email = req.body.email;
	let password = req.body.password;

    /*passport.authenticate('local-login', function (err, user, info) {
		console.log("in here 1");
    	console.log(err, user, info)
        if (err) {
        	console.log('err', err)
            return next(err);
        }
        if (!user) {
			console.log('!user');
            return res.send({ success: false, message: info });
        }
        console.log('user', user);
        console.log('firstName', user['firstName']);
        console.log("<== " + user.email + " Logged in [" +
                    new Date() + "] <==");

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            req.auth = {};
            req.auth.user = user;
            req.auth.info = info;
            return next();
        });
	})(req, res, next);*/

	console.log('vijay', req.user);
	console.log('email, password', email, password)
	if (!email || !password) {
		let error = helper.getErrorResponse('MissingParameter');
		return res.status(error.statusCode).send(error.error);
	}
	email = email.toLowerCase();
	helper.getUserDetails({email : email, password : password}, function(err, data) {
	    if (err) {
			console.log('login error:', err);
			let error = helper.getErrorResponse('IncorrectEmailOrPassword');
			return res.status(error.statusCode).send(error.error);
	    }
	    /*if (!data.name) {
	    	data.name = helper.getName(data.firstName, data.lastName);
	    }*/
	    return res.send({status : true, data : data});
	});
});

router.post('/addT', isLoggedIn, function(req, res) {
	console.log('login : start');
	res.send({status : true})
});

router.post('/addTask', isLoggedIn, async function(req, res) {
	console.log('user', req.user);
	var data = {
		name : req.body.task,
		email : req.user.email,
		status : 'active',
		created : Date.now()
	}
	try {
	    var collection = db.getCollection('tasks');
		let savePolicy = await collection.save(data);
		return res.send({status : true, savePolicy});
	} catch(err) {
		console.log('error', err);
		return res.send({status : false, error : err});
	}
});

router.get('*', function(req, res) {
	console.log('inside get *')
	res.sendfile('./public/index.html');
});



// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	console.log('inside isLoggedIn');
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('not authenticated')
    res.redirect('/');
}

module.exports = router;