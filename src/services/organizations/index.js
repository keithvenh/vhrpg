import { factions } from "../../db/static/factions"

// === CREATE === //
export async function createOrganization() {
  return false;
}

// === READ === //
export function fetchAllOrganizations() {
  const allOrganizations = Object.entries(factions).map(([id, data]) => ({ id, ...data }));
  return allOrganizations;
}

export function fetchOrganization(id) {
  return factions[id];
}

// === UPDATE === //
export async function updateOrganization(id, data) {
  return false;
}

// === DESTROY === //
export async function deleteOrganization(id) {
  return false;
}