import { vehiclesCollection } from "../../db/application/db"
import { getDocs, query, orderBy, getDoc, doc, updateDoc } from 'firebase/firestore';

// === CREATE === //
export async function createVehicle() {
  return false
}

// === READ === //
export async function fetchAllVehicles() {
  const q = query(vehiclesCollection, orderBy('displayName'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}

export async function fetchVehicle(id) {
  const vehicle = await getDoc(doc(vehiclesCollection, id));
  if(vehicle) {return {...vehicle.data(), id: vehicle.id}}
  else {return console.log("There was an error fetching your vehicle")}
}

// === UPDATE === //
export async function updateVehicle(id, data) {
  try {
    await updateDoc(doc(vehiclesCollection, id), data);
    console.log("Vehicle Updated Successfully")
  }
  catch(error) {console.log("There was an error updating the character", error)}
}

// === DESTROY === //
export async function deleteVehicle(id) {
  return false
}