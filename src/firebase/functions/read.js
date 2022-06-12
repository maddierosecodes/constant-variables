import db from "../index";

import {
	doc,
	collection,
	query,
	where,
	getDoc,
	getDocs
} from "firebase/firestore";
// Reading a single user profile
export const getProfile = (uid) => {
	// return Promise.all([
	return Promise.all([
		getDoc(doc(db, "app/users/drivers", uid)),
		getDoc(doc(db, "app/users/passengers", uid)),
		uid
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
				uid
			};

			return userData;
		})
		.catch((err) => console.log(err));
};

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
