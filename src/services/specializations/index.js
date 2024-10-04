import {specializations} from '../../db/static/specializations'

// === CREATE === //
export async function createSpecialization() {
  return false;
}

// === READ === //
export function fetchAllSpecializations() {
  const allSpecializations = Object.entries(specializations).map(([id, data]) => ({ id, ...data }));
  return allSpecializations;
}

export function fetchSpecialization(id) {
  return specializations[id];
}

// === UPDATE === //
export async function updateSpecialization(id, data) {
  return false;
}

// === DESTROY === //
export async function deleteSpecialization(id) {
  return false;
}