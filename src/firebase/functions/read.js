import db from '../index';
import { doc, collection, getDoc } from 'firebase/firestore';

// Reading a single user profile

export const getProfile = (uid) => {
  return Promise.all([
    getDoc(doc(db, 'app/users/passengers', uid)),
    getDoc(doc(db, 'app/users/drivers', uid))
  ]).then((res) => {
    console.log(res);
  });
};
