import { usersCollection } from "../../db/application/db"
import { getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';

// === CREATE === //
export async function createUser() {
  return false
}

// === READ === //
export async function fetchAllUsers() {
  const q = query(planetsCollection, orderBy('displayName'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}

export async function fetchUser(id) {
  const user = await getDoc(doc(usersCollection, id));
  if(user) {return {...user.data(), id: user.id}}
  else {return console.log("There was an error fetching your contact")}
}

// === UPDATE === //
export async function updateUser(id, data) {
  return false
}

// === DESTROY === //
export async function deleteUser(id) {
  return false
}