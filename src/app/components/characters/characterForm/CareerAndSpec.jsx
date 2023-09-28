import FormSelect from '../../forms/FormSelect';
import TagInput from '../../forms/TagInput';

export default function CareerAndSpec({values, handleFormChange}) {
  const careers = [
    {value: '', display: 'SELECT ONE'},
    {value: 'Explorer', display: 'Explorer'},
    {value: 'Guardian', display: 'Guardian'},
    {value: 'Hired Gun', display: 'Hired Gun'},
    {value: 'Mystic', display: 'Mystic'},
    {value: "Spy", display: 'Spy'},
    {value: 'Technicion', display: 'Technician'},
    {value: 'Consular', display: 'Sage'},
    {value: 'Colonist', display: 'Colonist'},
    {value: 'Smuggler', display: 'Smuggler'},
    {value: 'Bounty Hunter', display: 'Bounty Hunter'}
  ]

  const specializations = ['Advisor', 'Ataru Striker', 'Captain of the Guard', 'Modder', 'Force Sensitive', 'Infiltrator', 'Bodyguard', 'Sage', 'Peacekeeper', 'Planetary Defense Force Officer', 'Mechanic', 'Imperial Academy Cader', 'Sleeper Agent']

  return (
    <>
      <FormSelect
        name='career'
        label='Career'
        value={values.career}
        handler={handleFormChange}
        options={careers}
      />
      <TagInput 
        name='specializations'
        label="specializations"
        tags={values.specializations} 
        onTagsChange={handleFormChange} 
        options={specializations}/>
    </>
  )
}