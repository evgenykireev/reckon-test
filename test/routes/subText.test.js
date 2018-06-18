/* eslint-env mocha */

const request = require('supertest');

describe('running test2 server', () => {
	let server;

	beforeEach(() => {
		// eslint-disable-next-line
		server = require('../../bin/www');
	});

	afterEach(() => {
		server.close();
	});

	it('responds to /subtext', (done) => {
		request(server)
			.get('/subtext')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

