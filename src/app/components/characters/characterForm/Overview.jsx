import FormInput from '../../forms/FormInput';
import FormSelect from '../../forms/FormSelect';

export default function Overview({values, handleFormChange}) {

  const characterTypeOptions = [
    {value: 'pc', display: 'PlayerCharacter'},
    {value: 'nemesis', display: 'Nemesis'},
    {value: 'rival', display: 'Rival'},
    {value: 'minion', display: 'Minion'}
  ]

  return (
    <>
      <FormInput 
        name='displayName'
        label='Character Name'
        value={values.displayName}
        handler={handleFormChange}
        autoFocus={true}
      />
      <FormSelect
        name='type'
        label='Character Type'
        value={values.type}
        handler={handleFormChange}
        options={characterTypeOptions} 
      />
      <FormInput
        name='imageURL'
        label='Image URL'
        value={values.imageURL}
        handler={handleFormChange}
      />
      <FormInput
        name='species'
        label='Species'
        value={values.species}
        handler={handleFormChange}
      />
    </>
  )
}