import db from "../index";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Creates a new document from a document object, path and specfied unique id- for users
export const writeUserData = (document, path, uid) => {
  return setDoc(doc(db, path, uid), document)
    .then(console.log("write successful"))
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
  body: "Ooh la la, how fancy",
  createdBy: "Joe Mama",
  creatorId: "DlvzNfVsaZXHeRV8dujxHWg3ehD3",
  date: "2022-06-11T23:29",
  destination: "PR9 7LL",
  email: "emilybennett93@hotmail.com",
  passengers: 2,
  postcodeStart: "PR8 4AN",
  status: {
    accepted: true,
    acceptedBy: {
      uid: "C9S2NwGZObPvJ1hmcYdQj2maPy32",
      username: "usera",
    },
  },
};

export const postAdvert = (isDriver, document = exampleListing) => {
  const path = isDriver ? "/app/listings/offers" : "/app/listings/requests";

  return addDoc(collection(db, path), document)
    .then((res) => {
      console.log(res, "success!");
    })
    .catch(console.log);
};

export const registerInterest = (rideID, uid, username, type) => {
  console.log(rideID, uid, type);
  const path = `/app/listings/${type}s`;

  const rideRef = doc(db, path, rideID);

  return updateDoc(rideRef, {
    interestedUserObjs: arrayUnion({ uid, username, type }),
    interestedUserIDs: arrayUnion(uid),
  })
    .then(console.log)
    .catch(console.log);
};

export const acceptInterest = (user, rideID) => {
  console.log({ user, rideID });

  const path = `/app/listings/${user.type}s`;
  console.log(path);
  const rideRef = doc(db, path, rideID);

  return updateDoc(rideRef, {
    interestedUserObjs: arrayRemove(user),
    interestedUserIDs: arrayRemove(user.uid),
    accepted: user,
  })
    .then((doc) => {
      console.log(doc);
    })
    .catch(console.log);
};

export const rejectInterest = (user, rideID) => {
  console.log({ user, rideID });

  const path = `/app/listings/${user.type}s`;
  console.log(path);
  const rideRef = doc(db, path, rideID);

  return updateDoc(rideRef, {
    interestedUserObjs: arrayRemove(user),
    interestedUserIDs: arrayRemove(user.uid),
    rejected: arrayUnion(user.uid),
  })
    .then((doc) => {
      console.log(doc);
    })
    .catch(console.log);
};
