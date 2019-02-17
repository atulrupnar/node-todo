var expect = require('chai').expect;
var validation = require('./../app/helpers/validation');
var res;

describe('Validation Functions', function () {

    it('register', function () {
        res = validation.isValid({
            input : {
                firstName : 'atul',
                lastName : 'ar',
                email : 'atul@123.com',
                password : '123'
            }
        }, 'post-signup');
        expect(res.error).to.be.equal(false);
        res = validation.isValid({
            input : {
                firstName : 'atul',
                lastName : '',
                email : 'atul@123.com',
                password : '123'
            }
        }, 'post-signup');
        expect(res.error).to.be.equal(true);
    });

    it('addTask', function () {
        res = validation.isValid({
            email : 'atul@b.com',
            password : '123'
        }, 'post-login');
        expect(res.error).to.be.equal(false);
        res = validation.isValid({
            email : 'atul@b.com',
            password : ''
        }, 'post-login');
        expect(res.error).to.be.equal(true);
    });

    it('addTask', function () {
        res = validation.isValid({
            task : 'my new task'
        }, 'post-addTask');
        expect(res.error).to.be.equal(false);
        res = validation.isValid({
            input : {
                email : 'atul@b.com',
                password : '123'
            }
        }, 'post-addTask');
        expect(res.error).to.be.equal(true);
    });

});