import { charactersCollection } from "../../db/application/db"
import { getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';

// === CREATE === //
export async function createCharacter() {
  return false
}

// === READ === //
export async function fetchAllCharacters() {
  const q = query(planetsCollection, orderBy('displayName'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}

export async function fetchCharacter(id) {
  const character = await getDoc(doc(charactersCollection, id));
  if(character) {return {...character.data(), id: character.id}}
  else {return console.log("There was an error fetching your character")}
}

// === UPDATE === //
export async function updateCharacter(id, data) {
  return false
}

// === DESTROY === //
export async function deleteCharacter(id) {
  return false
}