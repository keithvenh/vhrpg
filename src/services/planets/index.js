import { planetsCollection } from "../../db/application/db"
import { getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';
// === CREATE === //
export async function createPlanet() {
  return false
}

// === READ === //
export async function fetchAllPlanets() {
  const q = query(planetsCollection, orderBy('displayName'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}

export async function fetchPlanet(id) {
  const planet = await getDoc(doc(planetsCollection, id));
  if(planet) {return {...planet.data(), id: planet.id}}
  else {return console.log("There was an error fetching your planet")}
}

// === UPDATE === //
export async function updatePlanet(id, data) {
  return false
}

// === DESTROY === //
export async function deletePlanet(id) {
  return false
}