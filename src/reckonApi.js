const API_DOMAIN = process.env.RECKON_API_DOMAIN || 'https://join.reckon.com';
const request = require('requestretry').defaults({
	json: true,
	maxAttempts: 10,
	retryDelay: 500,
	fullResponse: false,
});

/**
 * Get range info from API
 * @return {Promise.<{}>}
 */
const getRange = async () => request(`${API_DOMAIN}/test1/rangeInfo`);

/**
 * Get divisor from API
 * @return {Promise.<{}>}
 */
const getDivisor = async () => request(`${API_DOMAIN}/test1/divisorInfo`);

/**
 * Get text to search from API
 * @return {Promise.<{}>}
 */
const getTextToSearch = async () => request(`${API_DOMAIN}/test2/textToSearch`);

/**
 * Get sub texts from API
 * @return {Promise.<{}>}
 */
const getSubTexts = async () => request(`${API_DOMAIN}/test2/subTexts`);

/**
 * Submit results back to API endpoint.
 *
 * @param json
 * @return {Promise.<boolean>}
 */
const submitSubtextResults = async (json) => {
	const result = await request({
		url: `${API_DOMAIN}/test2/submitResults`,
		method: 'POST',
		fullResponse: true,
		json,
	});

	if (result.statusCode !== 200) {
		throw new Error(`Failed to POST results - ${result.statusCode} ${result.statusMessage}`);
	}

	return {};
};

module.exports = {
	getRange,
	getDivisor,
	getTextToSearch,
	getSubTexts,
	submitSubtextResults,
};
