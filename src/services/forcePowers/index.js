import {forcePowers} from '../../db/static/forcePowers'

// === CREATE === //
export async function createForcePower() {
  return false;
}

// === READ === //
export function fetchAllForcePowers() {
  const allForcePowers = Object.entries(forcePowers).map(([id, data]) => ({ id, ...data }));
  return allForcePowers;
}

export function fetchForcePower(id) {
  return forcePowers[id];
}

// === UPDATE === //
export async function updateForcePower(id, data) {
  return false;
}

// === DESTROY === //
export async function deleteForcePower(id) {
  return false;
}