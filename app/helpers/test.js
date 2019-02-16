let validation = require('./validation');
var input = {
	email : 'atul@b.com',
	password : '123',
	url: '/login'
}
console.log(validation.isValid(input, 'post-login'));