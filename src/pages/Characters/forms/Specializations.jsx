import FormSelect from '../../../app/components/forms/FormSelect';
import FormButton from '../../../app/components/forms/FormButton';
import {useState} from 'react';
import { fetchAllSpecializations, fetchSpecialization } from '../../../services/specializations';
import { fetchCareer } from '../../../services/careers';


export default function Specializaitons({character, handler}) {
  const career = fetchCareer(character.career.id);
  const allSpecializations = fetchAllSpecializations();
  const [careerSpecializations, setCareerSpecializations] = useState(career.specializations)
  const [newSpecialization, setNewSpecialization] = useState('')
  

  function handleCareerSpecChange(event) {
    const specialization = fetchSpecialization(event.target.value);
    let specializations = character.specializations || []
    specializations[0] = specialization
    handler({ career: {
      ...character.career,
      specialization: {
        id: specialization.id,
        name: specialization.name
        }
      },
      specializations
    })
  }

  function handleSpecChange(index, event) {
    const specialization = fetchSpecialization(event.target.value);
    let specializations = character.specializations || []
    specializations[index] = specialization
    handler({specializations})
  }

  function handleNewSpecChange(event) {
    setNewSpecialization(event.target.value);
  }

  function handleAddSpec() {
    const specialization = fetchSpecialization(newSpecialization);
    handler({
      specializations: [
        ...character.specializations,
        specialization
      ]
    })
    setNewSpecialization('');
  }

  return (
    <div className='Specializaitons'>
      <h1>{character.name || character.displayName || "Character"} Specializaitons</h1>
      <h2>Career Specialization</h2>
      <FormSelect
        name='careerSpec'
        value={character.career?.specialization?.id || ''}
        handler={handleCareerSpecChange}
        options={careerSpecializations.map(spec => ({value: spec.id, display: spec.name})).sort((a,b) => a.display.localeCompare(b.display))}
      ><option value='' disabled>SELECT ONE</option></FormSelect>
      <hr />
      <h2>Additional Specializations</h2>
      {character.specializations.map((spec, index) => {
        if(index>0) {
          return (
            <FormSelect
              key={index}
              name='additionalSpec'
              value={spec.id}
              handler={(e) => handleSpecChange(index, e)}
              options={allSpecializations.map(spec => ({value: spec.id, display: spec.name})).sort((a,b) => a.display.localeCompare(b.display))}
            ><option value='' disabled>SELECT ONE</option></FormSelect>
          )
        }
      })}
      <hr />
      <h2>Add a Specialization</h2>
      <FormSelect
        name='addSpec'
        value={newSpecialization}
        handler={handleNewSpecChange}
        options={allSpecializations.map(spec => ({value: spec.id, display: spec.name})).sort((a,b) => a.display.localeCompare(b.display))}
      ><option value='' disabled>SELECT ONE</option></FormSelect>
      <FormButton
        type='submit'
        label='Add Specialization'
        handler={handleAddSpec}
      />  
    </div>
  )
}