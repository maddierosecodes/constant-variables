const postcodes = [];

// no m10 post code for reasons

for (let i = 1; i <= 20; i++) {
	if (i !== 10) {
		postcodes.push(`M${i}`);
	}
}

module.exports = postcodes;
