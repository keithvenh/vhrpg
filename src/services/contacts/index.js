import { contactsCollection } from "../../db/application/db"
import { getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';

// === CREATE === //
export async function createContact() {
  return false
}

// === READ === //
export async function fetchAllContacts() {
  const q = query(planetsCollection, orderBy('displayName'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}

export async function fetchContact(id) {
  const contact = await getDoc(doc(contactsCollection, id));
  if(contact) {return {...contact.data(), id: contact.id}}
  else {return console.log("There was an error fetching your contact")}
}

// === UPDATE === //
export async function updateContact(id, data) {
  return false
}

// === DESTROY === //
export async function deleteContact(id) {
  return false
}