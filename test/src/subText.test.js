/* eslint-env mocha */

const { assert } = require('chai');
const SubText = require('../../src/subText');

describe('run', () => {
	const defaultSubTexts = {
		subTexts: [
			'Peter',
			'peter',
			'Pick',
			'Pi',
			'Z',
		],
	};

	const defaultTextToSearch = {
		text: 'Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!',
	};

	it('should run example test', async () => {
		const apiMock = {
			getSubTexts: () => defaultSubTexts,
			getTextToSearch: () => defaultTextToSearch,
		};

		const subTextHandler = new SubText(apiMock);
		const result = await subTextHandler.run();

		assert.deepEqual(result, {
			text: 'Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!',
			results:
				[
					{ subtext: 'Peter', result: '1, 43, 98' },
					{ subtext: 'peter', result: '1, 43, 98' },
					{ subtext: 'Pick', result: '53, 81' },
					{ subtext: 'Pi', result: '53, 60, 66, 74, 81' },
					{ subtext: 'Z', result: '<No Output>' },
				],
		});
	});

	it('should run empty text test', async () => {
		const apiMock = {
			getSubTexts: () => ({
				subTexts: [
					'test',
				],
			}),
			getTextToSearch: () => ({
				text: '',
			}),
		};

		const subTextHandler = new SubText(apiMock);
		const result = await subTextHandler.run();
		assert.deepEqual(result, {
			text: '',
			results: [{ subtext: 'test', result: '<No Output>' }],
		});
	});

	it('should run empty subtext test', async () => {
		const apiMock = {
			getSubTexts: () => ({
				subTexts: [],
			}),
			getTextToSearch: () => ({
				text: 'test',
			}),
		};

		const subTextHandler = new SubText(apiMock);
		const result = await subTextHandler.run();
		assert.deepEqual(result, { text: 'test', results: [] });
	});
});
