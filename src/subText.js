class SubText {
	/**
	 * Class constructor.
	 * @param api
	 */
	constructor(api) {
		this.api = api;
	}

	/**
	 * Find positions of the beginning of each match for the subtext within the text.
	 * @param text
	 * @param subtext
	 * @return {Array}
	 */
	static findSubtext(text, subtext) {
		const positions = [];
		let i;
		let j;

		for (i = 0; i < text.length - subtext.length; i += 1) {
			for (j = 0; j < subtext.length; j += 1) {
				if (subtext[j].toLowerCase() !== text[i + j].toLowerCase()) {
					break;
				}
			}

			if (j === subtext.length) { // substring found
				positions.push(i + 1); // based on the example, first string character is considered to be 1
			}
		}

		return positions;
	}

	/**
	 * Run test2 - get text and subtexts from API, then find and return occurrences.
	 * @return {Promise.<{}>}
	 */
	async run() {
		const [{ subTexts }, { text }] = await Promise.all([
			this.api.getSubTexts(), this.api.getTextToSearch(),
		]);

		const results = subTexts.map((subtext) => {
			const positions = SubText.findSubtext(text, subtext);
			const result = positions.length ? positions.join(', ') : '<No Output>';

			return {
				subtext,
				result,
			};
		});

		const payload = {
			text,
			results,
		};

		return payload;
	}
}

module.exports = SubText;
