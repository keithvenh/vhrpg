import {careers} from '../../db/static/careers'

// === CREATE === //
export async function createCareer() {
  return false;
}

// === READ === //
export function fetchAllCareers() {
  const allCareers = Object.entries(careers).map(([id, data]) => ({ id, ...data }));
  return allCareers;
}

export function fetchCareer(id) {
  return careers[id];
}

// === UPDATE === //
export async function updateCharacter(id, data) {
  return false;
}

// === DESTROY === //
export async function deleteCharacter(id) {
  return false;
}