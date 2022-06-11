import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
