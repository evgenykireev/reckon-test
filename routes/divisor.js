const express = require('express');

const reckonApi = require('../src/reckonApi');
const Divisor = require('../src/divisor');

const router = express.Router();
const divisorHandler = new Divisor(reckonApi);

router.get('/', async (req, res, next) => {
	let result = {};
	try {
		result = await divisorHandler.run();
	} catch (error) {
		return next(error);
	}

	res.send(result);
	return null;
});

module.exports = router;
