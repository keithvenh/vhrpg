import { usersCollection } from "../../db/application/db"
import { getDocs, query, orderBy, getDoc, doc, updateDoc } from 'firebase/firestore';

// === CREATE === //
export async function createUser() {
  return false
}

// === READ === //
export async function fetchAllUsers() {
  const q = query(usersCollection, orderBy('displayName'));
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
  try {
    await updateDoc(doc(usersCollection, id), data);
    console.log("Document Updated Successfully");
  } catch (error) {
    console.log("Error Updating Document: ", error)
  }
}

// === DESTROY === //
export async function deleteUser(id) {
  return false
}