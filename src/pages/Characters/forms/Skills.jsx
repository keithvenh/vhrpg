import { fetchAllSkills, fetchSkill } from "../../../services/skills"
import FormInput from "../../../app/components/forms/FormInput"

export default function Skills({character, handler}) {
  const allSkills = fetchAllSkills().sort((a,b) => a.name.localeCompare(b.name))

  function handleSkillChange(event) {
    const skill = fetchSkill(event.target.name)
    const field = skill.name.toLowerCase()
    const value = event.target.value
    const skills = character.skills || {}
    handler({skills: {
      ...skills,
      [field]: {
        ...skill,
        ...skills[field],
        rank: value
      }
    }})
  }

  function handleSkillCareerChange(careerSkill, event) {
    const skill = fetchSkill(careerSkill);
    const field = skill.name.toLowerCase();
    const isCareer = event.target.checked;
    const skills = character.skills || {};
    handler({skills: {
      ...skills,
      [field]: {
        ...skill,
        ...skills[field],
        isCareer
      }
    }})
  }

  return (
    <div className='Skills'>
      <h1>{character.name || character.displayName || "Character"} Skills</h1>
      {allSkills.map(skill => (
        <div key={skill.id} style={{display: "flex", alignItems: "center"}}>
          <FormInput
            name={skill.id}
            type='number'
            value={character.skills?.[skill.name.toLowerCase()]?.rank || 0}
            handler={handleSkillChange}
            label={skill.name}
          />
          <label>
            <input type='checkbox' checked={character.skills?.[skill.name.toLowerCase()]?.isCareer || false} onChange={(e) => handleSkillCareerChange(skill.id, e)}></input>
            Career?
          </label>
        </div>
      ))}
    </div>
  )
}