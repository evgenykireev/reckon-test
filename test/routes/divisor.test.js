/* eslint-env mocha */
const request = require('supertest');

describe('running test1 server', () => {
	let server;

	beforeEach(() => {
		// eslint-disable-next-line
		server = require('../../bin/www');
	});

	afterEach(() => {
		server.close();
	});

	it('responds to /', (done) => {
		request(server)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

