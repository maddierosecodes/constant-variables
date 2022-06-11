const mancPostCodes = [];

// no m10 post code for reasons

for (let i = 1; i <= 20; i++) {
	if (i !== 10) {
		mancPostCodes.push(`M${i}`);
	}
}

module.exports = mancPostCodes;
