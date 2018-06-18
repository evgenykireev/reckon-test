const express = require('express');

const { author } = require('../package.json');
const reckonApi = require('../src/reckonApi');
const SubText = require('../src/subText');

const router = express.Router();
const subTextHandler = new SubText(reckonApi);

router.get('/', async (req, res, next) => {
	let result = {};
	try {
		result = await subTextHandler.run();
	} catch (error) {
		return next(error);
	}

	result.candidate = author;
	res.send(result);

	try {
		await reckonApi.submitSubtextResults(result);
	} catch (error) {
		console.log(error);
	}

	return null;
});

module.exports = router;
