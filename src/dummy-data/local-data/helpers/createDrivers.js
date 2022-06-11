<<<<<<< HEAD
const { faker } = require('@faker-js/faker');
const postcodes = require('./postcodes');
const ageGroups = ['18-29', '30-50', '50+'];
=======
const { faker } = require("@faker-js/faker");
const postcodes = require("./postcodes");
const ageGroups = ["18-29", "30-50", "50+"];
const genders = ["male", "female", "non-binary"];
>>>>>>> 61e9884a6217ffed7eb69f8bbe0354635cf31f2b

function createDrivers(amount) {
  const drivers = [];

<<<<<<< HEAD
  for (let i = 0; i <= amount; i++) {
    const driver = {
      username: faker.internet.userName(),
      ageGroup: ageGroups[Math.floor(Math.random() * (0 - 3 + 1) + 3)],
      backgroundChecks: {
        dbs: true,
        licensed: true
      },
      carReg: faker.vehicle.vrm(),
      firstName: faker.name.firstName(),
      gender: 'male',
      isDriver: true,
      lastName: faker.name.lastName(),
      postcode: postcodes[Math.floor(Math.random() * (0 - 19 + 1) + 19)],
      profile: faker.lorem.paragraphs(),
      password: 'password',
      email: faker.internet.email()
    };
    drivers.push(driver);
  }
=======
	for (let i = 0; i < amount; i++) {
		const driver = {
			username: faker.internet.userName(),
			ageGroup: ageGroups[Math.floor(Math.random() * (0 - 2 + 1) + 2)],
			backgroundChecks: {
				dbs: true,
				licensed: true
			},
			carReg: faker.vehicle.vrm(),
			firstName: faker.name.firstName(),
			gender: genders[Math.floor(Math.random() * (0 - 2 + 1) + 2)],
			isDriver: true,
			lastName: faker.name.lastName(),
			postcode: postcodes[Math.floor(Math.random() * (0 - 18 + 1) + 18)],
			profile: faker.lorem.paragraphs()
		};
		drivers.push(driver);
	}
>>>>>>> 61e9884a6217ffed7eb69f8bbe0354635cf31f2b

  return drivers;
}

module.exports = createDrivers;
