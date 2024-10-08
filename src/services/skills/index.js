import {skills} from '../../db/static/skills'

// === CREATE === //
export async function createSkill() {
  return false;
}

// === READ === //
export function fetchAllSkills() {
  const allSkills = Object.entries(skills).map(([id, data]) => ({ id, ...data }));
  return allSkills;
}

export function fetchSkill(id) {
  return skills[id];
}

// === UPDATE === //
export async function updateSkill(id, data) {
  return false;
}

// === DESTROY === //
export async function deleteSkill(id) {
  return false;
}