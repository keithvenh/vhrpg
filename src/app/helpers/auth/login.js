import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";

export default async function login(email, password) {

  const auth = getAuth();

  return setPersistence(auth, browserLocalPersistence)
  .then(() => {

    // New sign-in will be persisted with local persistence.
    return signInWithEmailAndPassword(auth, email, password);

  }).catch((error) => {

    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    return {error};
    
  });

};