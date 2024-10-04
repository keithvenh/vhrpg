import Background from "./forms/Background";
import Obligation from './forms/Obligation';
import Species from "./forms/Species";
import Career from "./forms/Career";
import ForcePowers from "./forms/ForcePowers";
import Characteristics from "./forms/Characteristics";
import Skills from "./forms/Skills";
import Attributes from "./forms/Attributes";
import Motivations from "./forms/Motivations";
import Equipment from "./forms/Equipment";
import Weapons from "./forms/Weapons";
import Appearance from "./forms/Appearance";

import {useLocation} from 'react-router-dom';
import {useState} from 'react';
import { updateCharacter } from "../../services/characters";

export default function CharacterForm() {

  const location = useLocation();
  const {character} = location.state;
  const [characterForm, setCharacterForm] = useState(character)

  const sections = {
    background: <Background character={characterForm} handler={handleFormChanges} />,
    obligation: <Obligation character={characterForm} handler={handleFormChanges} />,
    species: <Species character={characterForm} handler={handleFormChanges} />,
    career: <Career character={characterForm} handler={handleFormChanges} />,
    forcePowers: <ForcePowers character={characterForm} handler={handleFormChanges} />,
    characteristics: <Characteristics character={characterForm} handler={handleFormChanges} />,
    skills: <Skills character={characterForm} handler={handleFormChanges} />,
    attributes: <Attributes character={characterForm} handler={handleFormChanges} />,
    motivations: <Motivations character={characterForm} handler={handleFormChanges} />,
    equipment: <Equipment character={characterForm} handler={handleFormChanges} />,
    weapons: <Weapons character={characterForm} handler={handleFormChanges} />,
    appearance: <Appearance character={characterForm} handler={handleFormChanges} />
  }
  const [currentSection, setCurrentSection] = useState('background')
  
  function updateSection(section) {
    setCurrentSection(section)
  }

  function handleFormChanges(event) {
    setCharacterForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  async function handleFormSubmit() {
    console.log("Submitting Form");
    try {await updateCharacter(character.id, characterForm)}
    catch(error) {"Error Updating Character:", error}
  }

  return (
    <div className='CharacterForm'>
      <div className='form-sections'>
        <a onClick={handleFormSubmit} className='submit-button'>Save Changes</a>
        <a onClick={() => updateSection('background')} className={`active-${currentSection == 'background'}`}>Background</a>
        <a onClick={() => updateSection('obligation')} className={`active-${currentSection == 'obligation'}`}>Obligation</a>
        <a onClick={() => updateSection('species')} className={`active-${currentSection == 'species'}`}>Species</a>
        <a onClick={() => updateSection('career')} className={`active-${currentSection == 'career'}`}>Career and Specializations</a>
        <a onClick={() => updateSection('forcePowers')} className={`active-${currentSection == 'forcePowers'}`}>Force Powers</a>
        <a onClick={() => updateSection('characteristics')} className={`active-${currentSection == 'characteristics'}`}>Characteristics</a>
        <a onClick={() => updateSection('skills')} className={`active-${currentSection == 'skills'}`}>Skills</a>
        <a onClick={() => updateSection('attributes')} className={`active-${currentSection == 'attributes'}`}>Attributes</a>
        <a onClick={() => updateSection('motivations')} className={`active-${currentSection == 'motivations'}`}>Motivations</a>
        <a onClick={() => updateSection('equipment')} className={`active-${currentSection == 'equipment'}`}>Equipment</a>
        <a onClick={() => updateSection('weapons')} className={`active-${currentSection == 'weapons'}`}>Weapons</a>
        <a onClick={() => updateSection('appearance')} className={`active-${currentSection == 'appearance'}`}>Appearance</a>
      </div>
      {sections[currentSection]}
    </div>
  )
}

//## The High and Mighty
//Pax was on his way to becoming a leading officer in the Planetary Defense Force of Pantora when he was wrongly accused of the assassination of the Chieftan of Orto Plutonia. His punishment was exile and the need to make his own way in the world and clear his name if he can.