'use strict';

var app = require('../server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;
var taskId;
var Cookies;

var task = {
  task: 'My New Todo Task ' + new Date()
};

var input  = {
  email : "atulrupnar@gmail.com",
  password : "123"
};

describe('API Tests', function() {
  describe('## login user ', function() {
    it('should login', function(done) {
      request(app)
        .post('/login')
        .send(input)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(true);
          console.log('set-cookie', res.headers['set-cookie']);
          Cookies = res.headers['set-cookie'];
          done();
        });
    });
  });

  console.log('Cookies', Cookies);
  describe('## Create task ', function() {
    it('should create a task', function(done) {
      request(app)
        .post('/addTask')
        .set('cookie', Cookies)
        .send(task)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(true);          
          done();
        });
    });
  });


describe('##  Get all tasks', function() {
    it('should get all tasks', function(done) {
      request(app)
        .get('/getTaskList')
        .set('cookie', Cookies)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(true);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data).to.have.lengthOf.at.least(1);
          taskId = res.body.data[0]._id;
          console.log('taskId', taskId);
          done();
        });
    });
  });
  describe('## Get completed tasks', function() {
    it('should get completed tasks', function(done) {
      request(app)
        .get('/completedTasks')
        .set('cookie', Cookies)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(true);
          done();
        });
    });
  });

  describe('## Update Task', function() {
    it('should mark task as completed', function(done) {
      request(app)
        .post('/updateTask')
        .set('cookie', Cookies)
        .send({taskId : taskId})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(true);
          done();
        });
    });
  });
  describe('## Delete Task', function() {
    it('should delete a task', function(done) {
      request(app)
        .post('/deleteTask')
        .set('cookie', Cookies)
        .send({taskId : taskId})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(true);
          console.log(res.body)
          done();
        });
    });
  });
});