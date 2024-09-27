import { speciesCollection } from "../../db/application/db"
import { getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';

// === CREATE === //
export async function createSpecies() {
  return false
}

// === READ === //
export async function fetchAllSpecies() {
  const q = query(speciesCollection, orderBy('displayName'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}

export async function fetchSpecies(id) {
  const species = await getDoc(doc(speciesCollection, id));
  if(species) {return {...species.data(), id: species.id}}
  else {return console.log("There was an error fetching your species")}
}

// === UPDATE === //
export async function updateSpecies(id, data) {
  return false
}

// === DESTROY === //
export async function deleteSpecies(id) {
  return false
}