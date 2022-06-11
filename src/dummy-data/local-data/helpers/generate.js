const fs = require('fs');
const createDrivers = require('./createDrivers');
const createPassengers = require('./createPassengers');

const writeData = (path, data) => {
  fs.writeFileSync(path, data, 'utf-8');
};

const drivers = createDrivers(1);
const passengers = createPassengers(1);
// replace local path with desired driver data location
writeData(
  'local path',
  'export const drivers = ' + JSON.stringify(drivers, null, 2)
);

// replace local path with desired passenger data location
writeData(
  'local path',
  'export const passengers = ' + JSON.stringify(passengers, null, 2)
);
