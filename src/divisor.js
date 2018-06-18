class Divisor {
	/**
	 * Class constructor.
	 * @param api
	 */
	constructor(api) {
		this.api = api;
	}

	/**
	 * Run test1 - get range and divisors, then generate the result.
	 * @return {Promise.<{}>}
	 */
	async run() {
		const [{ lower, upper }, { outputDetails }] = await Promise.all([
			this.api.getRange(), this.api.getDivisor(),
		]);

		const result = {};
		for (let i = lower; i <= upper; i += 1) {
			result[i] = outputDetails.reduce((accumulator, { divisor, output }) => {
				if (i % divisor === 0) {
					return accumulator + output;
				}

				return accumulator;
			}, '');
		}

		return result;
	}
}


module.exports = Divisor;
