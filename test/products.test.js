 var request = require('supertest')
    , express = require('express');

var assert = require('assert');
var app = require('../server.js');

describe('GET', function(){
	it('respond with json', function(done){
		request(app)
		.get('/products/1')
		.set('Accept', 'application/json')
		.expect('Content-Type', 'application/json; charset=utf-8')
		.expect(200, done);
	})
})

describe('POST', function(){
	it('respond with json', function(done){
		request(app)
		.post('/products')
		.send({
			"author":"maf","hours":"2","price":1,"_id":"b78a7830-21e9-11e5-93fc-752a0558247e"
		})
		.set('Accept', 'application/json')
		.expect('Content-Type', 'application/json; charset=utf-8')
		.expect(200, done);
	})
})

describe('POST', function(){
	it('respond with json', function(done){
		request(app)
		.post('/products')
		.send({
			"author":"maf","hours":"2","price":1,"_id":"b78a7830-21e9-11e5-93fc-752a0558247e"
		})
		.set('Accept', 'application/json')
		.expect('Content-Type', 'application/json; charset=utf-8')
		.expect(200, done);

		it('respond with json', function(done){
			request(app)
			.post('/products/b78a7830-21e9-11e5-93fc-752a0558247e')
			.set('Accept', 'application/json')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200, done);
		})

	})
})


describe('POST', function(){
	it('respond with json', function(done){
		request(app)
		.post('/products')
		.send({
			"author":"maf","hours":"2","price":1,"_id":"b78a7830-21e9-11e5-93fc-752a0558247e"
		})
		.set('Accept', 'application/json')
		.expect('Content-Type', 'application/json; charset=utf-8')
		.expect(200, done);

		it('respond with json', function(done){
			request(app)
			.post('/cart/')
			.set('Accept', 'application/json')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200, done);
		})

	})
})
