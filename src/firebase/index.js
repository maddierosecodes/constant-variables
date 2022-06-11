import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	getDoc
} from "firebase/firestore/lite";

const firebaseConfig = {
	apiKey: "AIzaSyDcqv5iCdZV_pMycq_MCkjnwP8r5ndGTl4",
	authDomain: "constant-variables.firebaseapp.com",
	projectId: "constant-variables",
	storageBucket: "constant-variables.appspot.com",
	messagingSenderId: "366788582606",
	appId: "1:366788582606:web:3ef07c414e2f24f425449f",
	measurementId: "G-0GB1LY0JZX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docRef = doc(db, "users", "bNX8a5FoaBaXxnwHivQ0");

export const docSnap = getDoc(docRef);

export default db;
