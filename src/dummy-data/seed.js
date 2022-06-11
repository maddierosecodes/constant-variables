import { createUser } from '../firebase/functions/auth';
import {
  writeUserData,
  writeListingData
} from '../firebase/functions/write.js';

export const seedUsers = (data, path) => {
  data.forEach((document) => {
    createUser(document.email, document.password).then((auth) => {
      console.log(auth);
      delete document.password;
      writeUserData(document, path, auth.uid);
    });
  });
};

export const seedListings = (data, path) => {
  data.forEach((document) => {
    writeListingData(document, path);
  });
};
