const db = require('./../config/db');
const errorCodes = require('./errorCodes');
const url = require('url');
var validationHelper = require('./validation');
//const config = require('./../config/config');

let isEmptyObject = obj => !Object.keys(obj).length > 0;

var apiEndpoint = function(req, res, next) {
    console.log('apiEndpoint')
    var apiUrl  = url.parse(req.url).pathname;
    req.endPoint = apiUrl.split('/').pop();
    console.log('endPoint', req.endPoint)
    return next();
};

let formatDate = (date) => {
    let dd = date.split('/');
    let d =  new Date(dd[1] + '/' + dd[0] + '/' + dd[2]);
    return d.getTime();
}

let strToDate = (date) => {
    let dd = date.split('/');
    let d =  new Date((dd[1]) + '/' + dd[0] + '/' + dd[2]);
    console.log('strToDate():', d);
    return d;    
}

var getParams = function(req) {
    return isEmptyObject(req.body) ? (isEmptyObject(req.params) ?
        req.query : req.params) : req.body;
}

let validateApi = function(req, res, next) {
    console.log('validation : start');
    let body = getParams(req);
    var method = req.method.toLowerCase();
    let apiType = method + '-' + req.endPoint;
    let result;
    let isValid = validationHelper.isValid(body, apiType);
    if (isValid.error) {
        result = isValid.msg;
        res.statusCode = result.statusCode;
        delete result.statusCode;
        return res.send({status : false, error : result});
    }
    return next();
};

var getErrorResponse = function(errorKey) {
    var errorXX = errorCodes.getErrorCodes(errorKey);
    var statusCode = errorXX.statusCode;
    delete errorXX.statusCode;
    errorXX.status = 'failed';
    return {statusCode : statusCode, error : errorXX};
};

let isTaskExist = async function(req, res, next) {
    var id = req.body._id;
    var collection = db.getCollection('tasks');
    try {
        let taskCount = await collection.count({
            name : req.body.task, email : req.user.email, status : 'active'});
        if (taskCount) {
            var result = getErrorResponse('duplicateTask');
            res.statusCode = result.statusCode;
            return res.send({status : false, error : result.error});
            //return res.send({status : false, error : "Task already exist"});
        }
        return next();
    } catch(err) {
        return res.send({status : false, error : err});
    }
};

let isEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

let isDate = (value) => {
    console.log('inside date', value)
    if (!/^(\d{2}\/\d{2}\/\d{4})$/.test(value)) {
        console.log('invalid date')
        return false;
    }
    let arr = value.split("/");
    return !(arr[0] > 31 || arr[1] > 12 || !arr[0] || !arr[1]);
}

let isPhone = value => /^(\d{7,10})$/.test(value);

let isObject = a => (!!a) && (a.constructor === Object);

let isArray = a => (!!a) && (a.constructor === Array);

// route middleware to ensure user is logged in
var isLoggedIn = function(req, res, next) {
    console.log('inside isLoggedIn');
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('not authenticated')
    res.redirect('/');
}

module.exports = {
    getErrorResponse : getErrorResponse,
    apiEndpoint : apiEndpoint,
    validateApi : validateApi,
    getParams : getParams,
    isEmptyObject : isEmptyObject,
    formatDate : formatDate,
    strToDate : strToDate,
    isTaskExist : isTaskExist,
    isEmail : isEmail,
    isDate : isDate,
    isPhone : isPhone,
    isArray : isArray,
    isObject : isObject,
    isLoggedIn : isLoggedIn
};