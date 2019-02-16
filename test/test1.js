'use strict';

var app = require('../server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;
var Cookies;

  var task = {
    task: 'integration test',
  };

  var input  = {
    email : "atulrupnar@gmail.com",
    password : "123"
  };



beforeEach((done) => {
    request(app)
        .post('/login')
        .send(input)
        .end((err, res) => {
            if (err) throw err;
            done();
        });
});

describe('API Tests', function() {
  /*describe('## login user ', function() {
    it('should login', function(done) {
      request(app)
        .post('/login')
        .send(input)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(true);
          console.log('set-cookie', res);
          Cookies = res.headers;
          done();
        });
    });
  });*/

    console.log('Cookies', Cookies);
  describe('## Create task ', function() {
    it('should create a task', function(done) {
      request(app)
        .post('/addTask')
        .send(task)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(true);          
          done();
        });
    });
  });
});