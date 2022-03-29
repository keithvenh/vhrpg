import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';

export default async function login(email, password) {
  const auth = getAuth();
  
  return setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                return {user: userCredential.user};
                
                // ...
            })
            .catch((error) => {
              return {errorCode: error.code, errorMessage: error.message, error: error.name};
              
            });
      })
      .catch((error) => {
        return {errorCode: error.code, errorMessage: error.message, error: error.name};
        
      });
};