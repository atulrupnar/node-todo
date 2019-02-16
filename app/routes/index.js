var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('./../config/db');
var emailHelper = require('./../helpers/emailHelper');
var helper = require('./../helpers/helper');
var ObjectID = require('mongodb').ObjectID;

var getUid = () => Math.floor((Math.random() * 100) + 54);

router.post('/signup', helper.apiEndpoint, helper.validateApi, function(req, res) {
	console.log('start : signup')
	let input = req.body.input;
	input.email = input.email.toLowerCase();
	var collection = db.getCollection('users');
	collection.findOne({email : input.email}, function(err, result) {
		if (result) {
			return res.send({status : false, error :
				{errorCode : 'AccountExists', msg : 'Account Already Exists'}});
		}
		let rand = getUid();
		let link = helper.getActivationLink(rand, req.get('host'), input.email);

		input.activationCode = rand;
		input.verifyFlag = false;

		collection.save(input, function (err, docs) {
		    if (err) {
				return res.send({status : false, error : {
					errorCode : 'DBError', msg : 'DB Error'
				}});
		    }

			emailHelper.sendMail({
			  to : 'atulrupnar@gmail.com',
			  subject : "Activate Your ToDo Account",
			  //text : "welcome to nodemailer",
			  html : "Dear " + input.firstName +",<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
			});
			return res.send({status : true});
		});
	});
});

router.get('/verify', async function(req, res) {
	var id = req.query.id;
	var email = req.query.email;
	console.log(id, email)
    var collection = db.getCollection('users');
    console.log({email : email, activationCode : parseInt(id)});
	collection.findOne({email : email, activationCode : parseInt(id)}, async function(err, result) {
		console.log(err, result)
		let savePolicy = await collection.update({email : email}, {$set : {verifyFlag : true}});
		if (result) {
			return res.redirect('/');
		}
		return res.redirect('/register');
		//redirect to custom error page => Invalid Link
	})

});

var authenticate = function(req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
        	console.log('err', err)
            return next(err);
        }
        if (!user) {
			console.log('!user');
            return res.send({ success: false, error : {msg: info}});
        }
        if (!user.validate) {
            return res.send({ success: false, error : {msg: info}});
        }
        console.log("<== " + user.email + " Logged in [" +
                    new Date() + "] <==");

        req.logIn(user, function (err) {
            if (err) {
            	console.log('login error', err);
			    return res.send({status : false, error : {msg : 'Internal Server error'}});
            }
            req.auth = {};
            req.auth.user = user;
            req.auth.info = info;
		    return res.send({status : true});
        });
	})(req, res, next);
};

/*passport.authenticate('local-login', {
            failureRedirect : '/login'
        })*/
router.post('/login', helper.apiEndpoint, helper.validateApi,
	authenticate, function(req, res) {});

router.get('tasks/active', helper.isLoggedIn, async function(req, res) {
	var email = req.user.email;
	try {
	    var collection = db.getCollection('tasks');
		let data = await collection.find({
			'email' : email, status : 'active'}).toArray();
		return res.send({status : true, data});
	} catch(err) {
		console.log('error', err);
		return res.send({status : false, error : err});
	}
});

router.get('/completedTasks', helper.isLoggedIn, async function(req, res) {
	console.log('completed tasks : start');
	var email = req.user.email;
	try {
	    var collection = db.getCollection('tasks');
		let data = await collection.find({'email' : email, status : 'completed'}).toArray();
		return res.send({status : true, data : data});
	} catch(err) {
		console.log('error', err);
		return res.send({status : false, error : err});
	}
});

router.get('/getTaskList', helper.isLoggedIn, async function(req, res) {
	var email = req.user.email;
	console.log(email);
	try {
	    var collection = db.getCollection('tasks');
		let data = await collection.find({'email' : email}).sort({created : -1}).toArray();
		return res.send({status : true, data : data});
	} catch(err) {
		console.log('error', err);
		return res.send({status : false, error : err});
	}
});

router.post('/addTask', helper.isLoggedIn, helper.validateApi, helper.isTaskExist, async function(req, res) {
	var data = {
		name : req.body.task,
		email : req.user.email,
		status : 'active',
		created : Date.now()
	}
	try {
	    var collection = db.getCollection('tasks');
		let saveTask = await collection.save(data);
		return res.send({status : true, data : saveTask});
	} catch(err) {
		console.log('error', err);
		return res.send({status : false, error : err});
	}
});

router.post('/updateTask', helper.isLoggedIn, async function(req, res) {
	var email = req.user.email;
	var id = req.body.taskId;
	console.log(id)
	try {
	    var collection = db.getCollection('tasks');
		let data = await collection.update({_id : ObjectID(id)},
			{$set : {status : 'completed'}});
		return res.send({status : true, data : data});
	} catch(err) {
		console.log('error', err);
		return res.send({status : false, error : err});
	}
});

router.post('/deleteTask', helper.isLoggedIn, async function(req, res) {
	var email = req.user.email;
	var id = req.body.taskId;
	console.log(email, id)
	try {
	    var collection = db.getCollection('tasks');
		let data = await collection.remove({_id : ObjectID(id)});
		return res.send({status : true, data : data});
	} catch(err) {
		console.log('error', err);
		return res.send({status : false, error : err});
	}
});

router.get('/isLoggedIn', function(req, res) {
	if (req.isAuthenticated()) {
		return res.send({status : true});
	}
	return res.send({status : false});
});


router.get('*', function(req, res) {
	console.log('inside get *')
	res.sendfile('./public/index.html');
});



// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
    	console.log('Logged In');
        return next();
    }
    console.log('not authenticated')
    res.redirect('/');
}

module.exports = router;