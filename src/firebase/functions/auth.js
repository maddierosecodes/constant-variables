import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

// Creates a new user account from an email and password
export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userObject = { uid: userCredential.user.uid, email };
      return userObject;
    })
    .catch((error) => {
      return error;
    });
};
