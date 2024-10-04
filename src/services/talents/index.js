import {talents} from '../../db/static/talents'

// === CREATE === //
export async function createTalent() {
  return false;
}

// === READ === //
export function fetchAllTalents() {
  const allTalents = Object.entries(talents).map(([id, data]) => ({ id, ...data }));
  return allTalents;
}

export function fetchTalent(id) {
  return talents[id];
}

// === UPDATE === //
export async function updateTalent(id, data) {
  return false;
}

// === DESTROY === //
export async function deleteTalent(id) {
  return false;
}