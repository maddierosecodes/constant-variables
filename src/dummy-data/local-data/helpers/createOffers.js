const { faker } = require("@faker-js/faker");
const postcodes = require("./postcodes");

function createOffer(startLocation) {
	const offer = {
		body: faker.lorem.paragraph(),
		date: "2022-06-15T19:58",
		destination: `${
			postcodes[Math.floor(Math.random() * (0 - 19 + 1) + 19)]
		} ${faker.random.numeric()}${faker.random.alpha({
			count: 2,
			casing: "upper"
		})}`,
		email: faker.internet.email(),
		passengers: +faker.random.numeric(1, {
			bannedDigits: ["5", "6", "7", "8", "9"]
		}),
		postcodeStart: startLocation,
		title: `Travel to ${faker.company.companyName()}`
	};

	return offer;
}

module.exports = createOffer;
