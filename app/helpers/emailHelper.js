const transporter = require('./../config/email');

var getMailOptions = function(data) {
	let mailOptions = {
		from: process.env.EmailAuthUser, // sender address
		to: data.to, // list of receivers
		subject: data.subject, // Subject line
		text : data.text,
		html: data.html
	};
	return mailOptions;
};
//`Name :- ${data.name}<br>Email :- ${data.email}<br>Query :- ${data.query}<br> Thanks Xinfin Foundation`

var sendMail = function(obj) {
    //var obj = JSON.parse(msg.content.toString());
    var mailOptions = getMailOptions(obj);
    console.log('mailOptions', mailOptions);
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('error', err);
            return false;
        } else {
            return true;
        }
    });
};

module.exports = {
	sendMail : sendMail
}
