import db from "../index";
import { doc, collection, getDoc } from "firebase/firestore";
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
