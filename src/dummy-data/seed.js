import { createUser } from '../firebase/functions/auth';
import {
  writeUserData,
  writeListingData
} from '../firebase/functions/write.js';

export const seedUsers = (data, path) => {
  // promise.all
  Promise.all(
    data.map((document) => {
      return createUser(document.email, document.password);
    })
  )
    .then((authObjects) => {
      return Promise.all(
        authObjects.map((authObj, i) => {
          console.log({ authObj });
          delete data[i].password;
          return writeUserData(data[i], path, authObj.uid);
        })
      );
    })
    .catch((err) => console.log(err));
  // data.forEach((document) => {
  //   createUser(document.email, document.password).then((auth) => {
  //     console.log(auth);
  //     delete document.password;
  //     writeUserData(document, path, auth.uid);
  //   });
  // });
};

export const seedListings = (data, path) => {
  data.forEach((document) => {
    writeListingData(document, path);
  });
};
