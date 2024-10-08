import {useState} from 'react';
import {fetchAllCareers, fetchCareer} from '../../../services/careers';
import {fetchSpecialization} from '../../../services/specializations';
import FormSelect from '../../../app/components/forms/FormSelect';
import Specializations from './Specializations';

export default function Career({character, handler}) {

  const careers = fetchAllCareers();
  const careerOptions = careers.map((career) => ({value: career.id, display: career.name})).sort((a, b) => (a.display.localeCompare(b.display)))

  function handleCareerChange(event) {
    const id = event.target.value;
    const career = fetchCareer(id);
    setCareerSpecOptions(getSpecOptions(career))
    handler({career: {id: id, name: career.name}})
  }

  return (
    <div className='Career'>
      <h1>{character.name || character.displayName || "Character"} Career</h1>
      <FormSelect
        name='career'
        value={character.career?.id}
        handler={handleCareerChange}
        options={careerOptions}
      />
      <hr />
      <Specializations character={character} handler={handler} />
    </div>
  )
}