/* eslint-env mocha */

const { assert } = require('chai');
const Divisor = require('../../src/divisor');

describe('run', () => {
	const defaultRange = {
		lower: 1,
		upper: 15,
	};

	const defaultDivisor = {
		outputDetails: [
			{
				divisor: 3,
				output: 'Boss',
			},
			{
				divisor: 5,
				output: 'Hogg',
			},
		],
	};

	it('should run example test', async () => {
		const apiMock = {
			getRange: () => defaultRange,
			getDivisor: () => defaultDivisor,
		};

		const divisorHandler = new Divisor(apiMock);
		const result = await divisorHandler.run();

		assert.deepEqual(result, {
			1: '',
			2: '',
			3: 'Boss',
			4: '',
			5: 'Hogg',
			6: 'Boss',
			7: '',
			8: '',
			9: 'Boss',
			10: 'Hogg',
			11: '',
			12: 'Boss',
			13: '',
			14: '',
			15: 'BossHogg',
		});
	});

	it('should run big range', async () => {
		const upperRange = 10000;
		const apiMock = {
			getRange: () => ({
				lower: 0,
				upper: upperRange,
			}),
			getDivisor: () => defaultDivisor,
		};

		const divisorHandler = new Divisor(apiMock);
		const result = await divisorHandler.run();

		assert.equal(Object.keys(result).length - 1, upperRange);
	});

	it('should run with empty range', async () => {
		const apiMock = {
			getRange: () => ({}),
			getDivisor: () => defaultDivisor,
		};

		const divisorHandler = new Divisor(apiMock);
		const result = await divisorHandler.run();
		assert.notStrictEqual(result, {});
	});

	it('should run with wrong range', async () => {
		const apiMock = {
			getRange: () => ({
				lower: 10,
				upper: 0,
			}),
			getDivisor: () => defaultDivisor,
		};

		const divisorHandler = new Divisor(apiMock);
		const result = await divisorHandler.run();
		assert.notStrictEqual(result, {});
	});

	it('should fail with empty divisor', async () => {
		const apiMock = {
			getRange: () => defaultRange,
			getDivisor: () => ({}),
		};

		const divisorHandler = new Divisor(apiMock);
		let error;
		try {
			await divisorHandler.run();
		} catch (e) {
			error = e;
		}

		assert.typeOf(error, 'error', 'got error');
	});

	it('should fail with other divisor', async () => {
		const apiMock = {
			getRange: () => ({
				lower: 1,
				upper: 10,
			}),
			getDivisor: () => ({
				outputDetails: [
					{
						divisor: 2,
						output: 'fuzz',
					},
				],
			}),
		};

		const divisorHandler = new Divisor(apiMock);
		const result = await divisorHandler.run();
		assert.deepEqual(result, {
			1: '',
			2: 'fuzz',
			3: '',
			4: 'fuzz',
			5: '',
			6: 'fuzz',
			7: '',
			8: 'fuzz',
			9: '',
			10: 'fuzz',
		});
	});
});

