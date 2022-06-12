import db from "../index";
import { doc, collection, query, where, getDocs } from "firebase/firestore";

export const fetchOffers = () => {
  const offersRef = collection(db, "/app/listings/offers");
  const offersQuery = query(offersRef, where("statusAccepted", "==", false));

  return getDocs(offersQuery).then((snapshots) => {
    const adList = [];
    snapshots.forEach((doc) => {
      const data = doc.data();
      data.uid = doc.id;
      data.createdAt = data.createdAt.seconds
      data.date = data.date.seconds
      adList.push(data);
    });
    console.log(adList);
    return adList;
  });
};
