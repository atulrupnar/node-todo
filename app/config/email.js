var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
	//host: process.env.EmailHost,
	service: process.env.EmailService,
	secure: false,
	auth: {
		user: process.env.EmailAuthUser,
		pass: process.env.EmailAuthPass
	}
});

module.exports = transporter;