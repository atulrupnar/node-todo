/*
	- sanity/validation framework
	- single common function to check validation for complete
	- input : a map of input object to validation strategy
	- output : validation error or false instead
*/
const errorCodes = require('./errorCodes');
var sanityHelper = require('./sanitize');
var helper = require('./../routes/helper');

//compare input parameter against validations

var error = false;
var errorAt = '';
errorXX = {};

let clearGlobles = () => {
    error = false;
    var errorAt = '';
    errorXX = {};
}

var test = function(value, validation) {
    if (!validation) return;
    if (validation.required && !value) {
        errorXX = errorCodes.getErrorCodes('EmptyResource');
        throw Error('');
    }

    if (validation.type && typeof value !== validation.type) {
        errorXX = errorCodes.getErrorCodes('ResourceTypeMismatch');
        throw Error('');
    }

    if (validation.min !== undefined && value < validation.min) {
        errorXX = errorCodes.getErrorCodes('MessageTooSmall');
        errorXX.errMessage = errorXX.errMessage.replace(/{{MIN}}/, validation.min);
        throw Error('');
    }
    if (validation.length !== undefined && value.length != validation.length) {
        errorXX = errorCodes.getErrorCodes('ResourceSizeMismatch');
        errorXX.errMessage = errorXX.errMessage.replace(/{{SIZE}}/, validation.length);
        throw Error('');
    }

    if (validation.max !== undefined && value > validation.max) {
        errorXX = errorCodes.getErrorCodes('MessageTooLarge');
        errorXX.errMessage = errorXX.errMessage.replace(/{{MAX}}/, validation.max);
        throw Error('');
    }

    if (validation.email && value && !helper.isEmail(value)) {
        errorXX = errorCodes.getErrorCodes('InvalidEmail');
        throw Error('');
    }

    if (validation.date && !helper.isDate(value)) {
        errorXX = errorCodes.getErrorCodes('InvalidDate');
        throw Error('');
    }

    if (validation.phone && !helper.isPhone(value)) {
        errorXX = errorCodes.getErrorCodes('InvalidPhone');
        throw Error('');
    }

    if (validation.maxLength !== undefined && validation.max > value.length) {
        errorXX = errorCodes.getErrorCodes('maxLengthError');
        throw Error('');
    }
}

//loop through all input parameters to sanity test
var validate = function(iObj, vObj) {
	try {
		for (var key in vObj) {
            if (helper.isArray(iObj[key])) {
                for (var i in iObj[key]) {
                    validate(iObj[key][i], vObj[key][i]);
                }
            } else if (helper.isObject(iObj[key])) {
                validate(iObj[key], vObj[key]);
            } else {
                errorAt = key;
                iObj[key] = sanityHelper.sanitizeInput(key, iObj[key], vObj && vObj[key] ? vObj[key].type : undefined);
                test(iObj[key], vObj[key]);
            }
            if (error) {
                return {error : true, msg : errorXX};
            }
		}
	} catch (e) {
        console.log('validation error', e);
        error = true;
        errorXX.field = errorAt;
        return {error : true, msg : errorXX};
	}
    return {error : false};
};

var vTypes = {
    email : {type : 'string', email : true},
    emailReq : {type : 'string', email : true, required : true},
    string : {type : 'string'},
    stringReq : {type : 'string', required : true},
    name : {type : 'string', maxLength : 40},
    nameReq : {type : 'string', required : true, maxLength : 40},
    password : {type : 'string', required : true, passwordPolicy : true},
    boolean : {type : 'boolean'},
    phone : {type : 'string', required : true, phone : true}
};

//validation object structure
var apiObj = {
    'post-signup' : {
        input : {
            firstName : vTypes.nameReq,
            lastName : vTypes.name,
            email : vTypes.emailReq,
            password : vTypes.password
        }
    },
    'post-login' : {
        email : vTypes.email,
        password : vTypes.password
    },
    'post-addTask' : {
        task : vTypes.stringReq
    }
};


//var input = require('./input');
let isValid = (input, api) => {
    const vObj = apiObj[api];
    var res = validate(input, vObj);
    clearGlobles();
    return res;
}

module.exports = {
    isValid : isValid
};