import { createUser } from '../firebase/functions/auth';
import {
  writeUserData,
  writeListingData
} from '../firebase/functions/write.js';

// Creates a single user auth account and record in fire store
// Called with a user object and path (e.g 'app/users/drivers')
export const seedUsers = (document, path) => {
  createUser(document.email, document.password)
    .then((auth) => {
      console.log('user added to fire auth', { auth });
      delete document.password;
      return writeUserData(document, path, auth.uid);
    })
    .then(console.log('user data written to firestore'));
};

// Creates a single listing record in fire store
// Called with a listing object and path (e.g 'app/users/offers')
export const seedListings = (document, path) => {
  return writeListingData(document, path).then(
    console.log('listing data written to firestore')
  );
};
