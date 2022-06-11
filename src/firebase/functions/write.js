import db from '../index';
import { doc, collection, addDoc, setDoc } from 'firebase/firestore';

export const writeUserData = (document, path, uid) => {
  return setDoc(doc(db, path, uid), document);
};

export const writeListingData = (document, path) => {
  return addDoc(collection(db, path), document);
};
