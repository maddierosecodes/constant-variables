import db from '../index';
import { doc, collection, addDoc, setDoc } from 'firebase/firestore';

export const writeUserData = (document, path, uid) => {
  console.log({ path, uid, document });
  return setDoc(doc(db, path, uid), document)
    .then((res) => {
      console.log('hi');
    })
    .catch((err) => console.log(err));
};

export const writeListingData = (document, path) => {
  return addDoc(collection(db, path), document)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
