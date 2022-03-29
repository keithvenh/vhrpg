import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';

export default async function login(email, password) {
  const auth = getAuth();
  
  setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
};