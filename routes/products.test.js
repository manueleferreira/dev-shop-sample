 var request = require('supertest')
    , express = require('express');

var app = require('../server.js');

describe('GET', function(){
    it('respond with json', function(done){
      request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })
  })