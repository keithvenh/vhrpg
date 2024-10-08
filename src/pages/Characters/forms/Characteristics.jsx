import FormInput from "../../../app/components/forms/FormInput"

export default function Characteristics({character, handler}) {

  function handleCharacteristicChange(event) {
    const field = event.target.name
    const value = event.target.value
    handler({[field]: value})
  }
  return (
    <div className='Characteristics'>
      <h1>{character.name || character.displayName || "Character"} Characteristics</h1>
      <FormInput
        name='brawn'
        type='number'
        value={character.brawn || 0}
        autoFocus={true}
        handler={handleCharacteristicChange}
        label='Brawn'
      />
      <FormInput
        name='agility'
        type='number'
        value={character.agility || 0}
        handler={handleCharacteristicChange}
        label='Agility'
      />
      <FormInput
        name='intellect'
        type='number'
        value={character.intellect || 0}
        handler={handleCharacteristicChange}
        label='Intellect'
      />
      <FormInput
        name='cunning'
        type='number'
        value={character.cunning || 0}
        handler={handleCharacteristicChange}
        label='Cunning'
      />
      <FormInput
        name='willpower'
        type='number'
        value={character.willpower || 0}
        handler={handleCharacteristicChange}
        label='Willpower'
      />
      <FormInput
        name='presence'
        type='number'
        value={character.presence || 0}
        handler={handleCharacteristicChange}
        label='Presence'
      />
      
    </div>
  )
}