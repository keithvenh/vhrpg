import {fetchAllCareers, fetchCareer} from '../../../services/careers';
import FormSelect from '../../../app/components/forms/FormSelect';

export default function Career({character, handler}) {
  const careers = fetchAllCareers();
  console.log(careers);
  const options = careers.map((career) => ({value: career.id, display: career.name}))
  return (
    <div className='Career'>
      <h1>{character.name || character.displayName || "Character"} Career</h1>
      <FormSelect
        name='career'
        value={character.career?.id}
        handler={handler}
        options={options}
      />
    </div>
  )
}