import db from '../index';
import { doc, collection, addDoc, setDoc } from 'firebase/firestore';

// Creates a new document from a document object, path and specfied unique id- for users
export const writeUserData = (document, path, uid) => {
  return setDoc(doc(db, path, uid), document)
    .then(console.log('write successful'))
    .catch((err) => console.log({ writeError: err }));
};

// Creates a new document with a randomly generate unique id from a document object and path - for listings
export const writeListingData = (document, path) => {
  return addDoc(collection(db, path), document)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
