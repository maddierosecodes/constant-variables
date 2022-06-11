const { faker } = require('@faker-js/faker');
const postcodes = require('./postcodes');
const ageGroups = ['18-29', '30-50', '50+'];

function createDrivers(amount) {
  const drivers = [];

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

  return drivers;
}

module.exports = createDrivers;
