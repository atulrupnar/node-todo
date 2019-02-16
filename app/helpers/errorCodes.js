var getErrorCodes = function(errorKey) {
	console.log('inside getErrorCodes')
	console.log('errorKey', errorKey)
	var errorCodes = {
		MissingParameter : {
			statusCode : 400,
			appErrorCode : 1001,
			msg : 'The request was unacceptable, often due to missing a required parameter'
		},
		EmptyResource : {
			statusCode : 400,
			appErrorCode : 1002,
			msg : 'No value provided for mandatory resource'
		},
		ResourceTypeMismatch : {
			statusCode : 400,
			appErrorCode : 1003,
			msg : 'The specified resource type does not match the required type'
		},
		ResourceNotFound : {
			statusCode : 404,
			appErrorCode : 1004,
			msg : 'The specified resource does not exist'
		},
		MessageTooLarge : {
			statusCode : 400,
			appErrorCode : 1005,
			msg : 'The resource exceeds the maximum allowed value of {{MAX}}'
		},
		MessageTooSmall : {
			statusCode : 400,
			appErrorCode : 1006,
			msg : 'The resource does not meet minimum required value of {{MIN}}'
		},
		ResourceSizeMismatch : {
			statusCode : 400,
			appErrorCode : 1007,
			msg : 'The resource does not match required size of {{SIZE}}'
		},
		InvalidEmail : {
			statusCode : 409,
			appErrorCode : 1008,
			msg : 'Invalid email'
		},
		InvalidDate : {
			statusCode : 400,
			appErrorCode : 1009,
			msg : 'Invalid date format'
		},
		InvalidValue : {
			statusCode : 409,
			appErrorCode : 1012,
			msg : 'Invalid value'
		},
		Unauthorized : {
			statusCode : 401,
			appErrorCode : 1013,
			msg : 'No valid API key provided'
		},
		RateLimitError : {
			statusCode : 429,
			appErrorCode : 1014,
			msg : 'Rate limit exceeded'
		},
		AccountAlreadyExists : {
			statusCode : 409,
			appErrorCode : 1015,
			msg : 'The specified account already exists'
		},
		InternalError : {
			statusCode : 500,
			appErrorCode : 1016,
			msg : 'Internal Error'
		},
		DbError : {
			statusCode : 500,
			appErrorCode : 1017,
			msg: 'DB Error'
		},
		EmailErrorActivation:{
			statusCode : 500,
			appErrorCode : 1018,
			msg: 'Cannot send activation email to the user'
		},
		EmailErrorForgot:{
			statusCode : 500,
			appErrorCode : 1019,
			msg: 'Cannot send forgot password/reset email to the user'
		},
		EmailErrorForgotInvalid:{
			statusCode : 404,
			appErrorCode : 1020,
			msg: 'Given email id does not exist'
		},
		ResetLinkExpired:{
			statusCode : 404,
			appErrorCode : 1021,
			msg: 'Reset Link Expired'
		},
		PasswordResetMismatch:{
			statusCode : 400,
			appErrorCode : 1022,
			msg: 'Cannot change password. Enter correct details'
		},
		GenericErr1:{
			statusCode : 500,
			appErrorCode : 1023,
			msg: 'Something went wrong. Cannot process the request'
		},
		IncorrectPassword:{
			statusCode : 400,
			appErrorCode : 1024,
			msg: 'Incorrect Password'
		},
		AccNotExists:{
			statusCode : 404,
			appErrorCode : 1025,
			msg: 'Account does not exists'
		},
		NotAllowed : {
			statusCode : 400,
			appErrorCode : 1026,
			msg: 'Not accessible'
		},
		InvalidPhone : {
			statusCode : 409,
			appErrorCode : 1027,
			msg : 'Invalid Phone Number'
		},
		maxLengthError : {
			statusCode : 409,
			appErrorCode : 1028,
			msg : 'Resource crossed maximum allowed length'
		},
		duplicateTask : {
			statusCode : 409,
			appErrorCode : 1029,
			msg : 'Task already exists'
		},

	};
	return errorCodes[errorKey];
};

module.exports = {
	getErrorCodes : getErrorCodes
};