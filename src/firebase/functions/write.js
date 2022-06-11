import db from '../index';
import { doc, collection, addDoc, setDoc } from 'firebase/firestore';

// Creates a new document from a document object, path and specified unique id- for users
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

const exampleListing = {
  body: 'Ooh la la, how fancy',
  createdBy: 'Joe Mama',
  creatorId: 'DlvzNfVsaZXHeRV8dujxHWg3ehD3',
  date: '2022-06-11T23:29',
  destination: 'PR9 7LL',
  email: 'emilybennett93@hotmail.com',
  passengers: 2,
  postcodeStart: 'PR8 4AN',
  status: {
    accepted: true,
    acceptedBy: {
      uid: 'C9S2NwGZObPvJ1hmcYdQj2maPy32',
      username: 'usera'
    }
  }
};

// creates a new listing
export const postAdvert = (isDriver, document = exampleListing) => {
  const path = isDriver ? '/app/listings/offers' : '/app/listings/requests';

  return addDoc(collection(db, path), document)
    .then((res) => {
      console.log(res, 'success!');
    })
    .catch(console.log);
};


