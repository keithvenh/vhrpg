import { planets } from "../../db/static/planets"

// === CREATE === //
export async function createPlanet() {
  return false;
}

// === READ === //
export function fetchAllPlanets() {
  const allPlanets = Object.entries(planets).map(([id, data]) => ({ id, ...data }));
  return allPlanets;
}

export function fetchPlanet(id) {
  return planets[id];
}

// === UPDATE === //
export async function updatePlanet(id, data) {
  return false;
}

// === DESTROY === //
export async function deletePlanet(id) {
  return false;
}