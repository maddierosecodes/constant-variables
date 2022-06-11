const fs = require('fs');
const createDrivers = require('./createDrivers');
const createPassengers = require('./createPassengers');

const writeData = (path, data) => {
  fs.writeFileSync(path, data, 'utf-8');
};

const drivers = createDrivers(1);
const passengers = createPassengers(1);

writeData(
  '/Users/maddiehughes/Code/projects/constant-variables/src/dummy-data/local-data/seed-data/drivers.js',
  'export const drivers = ' + JSON.stringify(drivers, null, 2)
);

writeData(
  '/Users/maddiehughes/Code/projects/constant-variables/src/dummy-data/local-data/seed-data/passengers.js',
  'export const passengers = ' + JSON.stringify(passengers, null, 2)
);
