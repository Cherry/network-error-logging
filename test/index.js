'use strict';
/* global describe, it */
const NEL = require('..');
const connect = require('connect');
const supertest = require('supertest');
const assert = require('assert');

function app(){
	let app = connect();
	app.use(NEL.apply(null, arguments));
	app.use(function(req, res){
		return res.end('Hello world!');
	});
	return app;
}

describe('reportTo', function(){
	it('fails when missing any options', function(){
		assert.throws(() => NEL(null), Error);
		assert.throws(() => NEL(123), Error);
		assert.throws(() => NEL('foo'), Error);
		assert.throws(() => NEL(undefined), Error);
		assert.throws(() => NEL(), Error);
	});

	it('fails when `report_to` bas a bad value', function(){
		assert.throws(() => NEL({
			report_to: null,
		}), Error);
		assert.throws(() => NEL({
			report_to: 123,
		}), Error);
		assert.throws(() => NEL({
			report_to: {foo: 'bar'},
		}), Error);
		assert.throws(() => NEL({
			report_to: [],
		}), Error);
	});

	it('fails when missing `max_age`', function(){
		assert.throws(() => NEL({
			report_to: 'endpoint-1'
		}), Error);
	});

	it('fails when `max_age` bas a bad value', function(){
		assert.throws(() => NEL({
			report_to: 'endpoint-1',
			max_age: -1
		}), Error);
	});

	it('fails when `include_subdomains` bas a bad value', function(){
		assert.throws(() => NEL({
			report_to: 'endpoint-1',
			max_age: 31536000,
			include_subdomains: -1
		}), Error);
	});

	it('fails when `success_fraction` bas a bad value', function(){
		assert.throws(() => NEL({
			report_to: 'endpoint-1',
			max_age: 31536000,
			include_subdomains: true,
			success_fraction: -1
		}), Error);
	});

	it('fails when `failure_fraction` bas a bad value', function(){
		assert.throws(() => NEL({
			report_to: 'endpoint-1',
			max_age: 31536000,
			include_subdomains: true,
			success_fraction: 0.5,
			failure_fraction: -1
		}), Error);
	});

	it('expect valid header response', function(){
		return supertest(app({
			report_to: 'endpoint-1',
			max_age: 31536000,
			include_subdomains: true,
			success_fraction: 0.5,
			failure_fraction: 0.1
		}))
			.get('/')
			.expect('NEL', '{"report_to":"endpoint-1","max_age":31536000,"include_subdomains":true,"success_fraction":0.5,"failure_fraction":0.1}')
			.expect('Hello world!');
	});

	it('names its function and middleware', function(){
		assert.strictEqual(NEL.name, 'networkErrorLogging');
		assert.strictEqual(NEL.name, NEL({
			report_to: 'endpoint-1',
			max_age: 31536000,
			include_subdomains: true,
			success_fraction: 0.5,
			failure_fraction: 0.1
		}).name);
	});
});