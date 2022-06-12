import db from "../index";
import { doc, collection, query, where, getDocs } from "firebase/firestore";

export const fetchListings = (collectionName) => {
  console.log("collectionName: ", collectionName);
  const listingsRef = collection(db, `/app/listings/${collectionName}`);
  const listingsQuery = query(
    listingsRef,
    where("statusAccepted", "==", false)
  );

  return getDocs(listingsQuery).then((snapshots) => {
    const adList = [];
    console.log(snapshots);
    snapshots.forEach((doc) => {
      console.log(doc);
      const data = doc.data();
      data.uid = doc.id;
      data.createdAt = data.createdAt.seconds;
      data.date = data.date.seconds;
      adList.push(data);
    });
    console.log(adList);
    return adList;
  });
};
