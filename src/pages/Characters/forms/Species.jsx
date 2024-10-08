import FormInput from '../../../app/components/forms/FormInput';

export default function Species({character, handler}) {

  function handleSpeciesChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    handler({[field]: value})
  }

  return (
    <div className='Species'>
      <h1>{character.name || character.displayName || "Character"} Species</h1>
      <FormInput
        name='species'
        type='text'
        value={character.species}
        autoFocus={true}
        handler={handleSpeciesChange}
        label='Character Species'
      />
    </div>
  )
}