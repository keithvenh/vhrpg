import { organizationsCollection } from "../../db/application/db"
import { getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';

// === CREATE === //
export async function createOrganization() {
  return false
}

// === READ === //
export async function fetchAllOrganizations() {
  const q = query(organizationsCollection, orderBy('displayName'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}

export async function fetchOrganization(id) {
  const organization = await getDoc(doc(organizationsCollection, id));
  if(organization) {return {...organization.data(), id: organization.id}}
  else {return console.log("There was an error fetching your organization")}
}

// === UPDATE === //
export async function updateOrganization(id, data) {
  return false
}

// === DESTROY === //
export async function deleteOrganization(id) {
  return false
}