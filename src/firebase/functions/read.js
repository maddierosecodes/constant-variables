import db from "../index";

import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
// Reading a single user profile
export const getProfile = (uid) => {
  // return Promise.all([
  return Promise.all([
    getDoc(doc(db, "app/users/drivers", uid)),
    getDoc(doc(db, "app/users/passengers", uid)),
    uid,
  ])
    .then(([driver, passenger, uid]) => {
      const { username, isDriver, postcode, email } = [driver, passenger]
        .filter((data) => data._document)[0]
        .data();

      const userData = {
        username,
        isDriver,
        postcode,
        isLogged: true,
        email,
        uid,
      };

      return userData;
    })
    .catch((err) => console.log(err));
};

export const getOtherProfile = (uid, role) => {
  return getDoc(doc(db, `/app/users/${role}s`, uid))
    .then((doc) => {
      const data = doc.data();

      data.uid = doc.id;

      return data;
    })
    .catch((err) => console.log(err));
};

export const fetchListings = (collectionName) => {
  const listingsRef = collection(db, `/app/listings/${collectionName}`);
  const listingsQuery = query(
    listingsRef,
    where("statusAccepted", "==", false)
  );

  return getDocs(listingsQuery).then((snapshots) => {
    const adList = [];

    snapshots.forEach((doc) => {
      const data = doc.data();
      data.uid = doc.id;
      data.createdAt = data.createdAt.seconds;
      data.date = data.date.seconds;
      adList.push(data);
    });

    return adList;
  });
};

export const fetchSingleListing = (rideID, type) => {
  return getDoc(doc(db, `/app/listings/${type}s`, rideID))
    .then((doc) => {
      const data = doc.data();

      data.posted = data.createdAt.seconds;
      data.date = data.date.seconds;
      data.uid = doc.id;

      return data;
    })
    .catch((err) => console.log(err));
};

export const fetchListingsByUserID = (isDriver, uid) => {
  const listingsRef = collection(
    db,
    `/app/listings/${isDriver ? "offers" : "requests"}`
  );
  const listingsQuery = query(listingsRef, where("creatorId", "==", uid));

  return getDocs(listingsQuery).then((snapshots) => {
    const adList = [];

    snapshots.forEach((doc) => {
      const data = doc.data();
      data.uid = doc.id;
      data.createdAt = data.createdAt.seconds;
      data.date = data.date.seconds;
      adList.push(data);
    });

    return adList;
  });
};

export const fetchAcceptedListingsByUserID = (isDriver, uid) => {
  const listingsRef = collection(
    db,
    `/app/listings/${isDriver ? "requests" : "offers"}`
  );
  const listingsQuery = query(listingsRef, where("accepted.uid", "==", uid));

  return getDocs(listingsQuery).then((snapshots) => {
    const adList = [];

    snapshots.forEach((doc) => {
      const data = doc.data();
      data.uid = doc.id;
      data.createdAt = data.createdAt.seconds;
      data.date = data.date.seconds;
      adList.push(data);
    });

    return adList;
  });
};

export const fetchPendingListingsByUserID = (isDriver, uid) => {
  const listingsRef = collection(
    db,
    `/app/listings/${isDriver ? "requests" : "offers"}`
  );
  const listingsQuery = query(
    listingsRef,
    where("interestedUserIDs", "array-contains", uid)
  );

  return getDocs(listingsQuery).then((snapshots) => {
    const adList = [];

    snapshots.forEach((doc) => {
      const data = doc.data();
      data.uid = doc.id;
      data.createdAt = data.createdAt.seconds;
      data.date = data.date.seconds;
      adList.push(data);
    });

    return adList;
  });
};
export const fetchRejectedListingsByUserID = (isDriver, uid) => {
  const listingsRef = collection(
    db,
    `/app/listings/${isDriver ? "requests" : "offers"}`
  );
  const listingsQuery = query(
    listingsRef,
    where("rejected", "array-contains", uid)
  );

  return getDocs(listingsQuery).then((snapshots) => {
    const adList = [];

    snapshots.forEach((doc) => {
      const data = doc.data();
      data.uid = doc.id;
      data.createdAt = data.createdAt.seconds;
      data.date = data.date.seconds;
      adList.push(data);
    });

    return adList;
  });
};
