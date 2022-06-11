const { faker } = require("@faker-js/faker");
const postcodes = require("./postcodes");
const ageGroups = ["18-29", "30-50", "50+"];
const genders = ["male", "female", "non-binary"];

function createPassengers(amount) {
	const passengers = [];

	for (let i = 0; i <= amount; i++) {
		const passenger = {
			username: faker.internet.userName(),
			ageGroup: ageGroups[Math.floor(Math.random() * (0 - 3 + 1) + 3)],
			firstName: faker.name.firstName(),
			gender: genders[Math.floor(Math.random() * (0 - 2 + 1) + 2)],
			isDriver: false,
			lastName: faker.name.lastName(),
			postcode: postcodes[Math.floor(Math.random() * (0 - 19 + 1) + 19)],
			profile: faker.lorem.paragraphs()
		};
		passengers.push(passenger);
	}

	return passengers;
}

module.exports = createPassengers;
