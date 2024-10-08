import FormInput from "../../../app/components/forms/FormInput";

export default function Other({character, handler}) {

  function handleOtherChange(event) {
    const field = event.target.name;
    let value = event.target.value;
    if(field == 'isContact') {value = event.target.checked}
    handler({[field]: value})
  }

  return (
    <div className='Other'>
      <h1>{character.name || character.displayName || "Character"} Other Information</h1>
      <FormInput
        name='xpAvailable'
        type='number'
        value={character.xpAvailable || 0}
        autoFocus={true}
        handler={handleOtherChange}
        label='XP Available'
      />
      <FormInput
        name='xpSpent'
        type='number'
        value={character.xpSpent || 0}
        autoFocus={true}
        handler={handleOtherChange}
        label='XP Spent'
      />
      <FormInput
        name='xpTotal'
        type='number'
        value={(parseInt(character.xpAvailable) || 0) + (parseInt(character.xpSpent) || 0)}
        autoFocus={true}
        handler={handleOtherChange}
        label='XP Total'
      />

      <FormInput
        name='creditsAvailable'
        type='number'
        value={character.creditsAvailable || 0}
        autoFocus={true}
        handler={handleOtherChange}
        label='Credits Available'
      />
      <FormInput
        name='creditsSpent'
        type='number'
        value={character.creditsSpent || 0}
        autoFocus={true}
        handler={handleOtherChange}
        label='Credits Spent'
      />
      <FormInput
        name='creditsTotal'
        type='number'
        value={(parseInt(character.creditsAvailable) || 0) + (parseInt(character.creditsSpent) || 0)}
        autoFocus={true}
        handler={handleOtherChange}
        label='Credits Total'
      />

      <FormInput
        name='location'
        type='text'
        value={character.location || ''}
        autoFocus={true}
        handler={handleOtherChange}
        label='Current Location'
      />

      <FormInput
        name='esteem'
        type='number'
        value={character.esteem || 0}
        autoFocus={true}
        handler={handleOtherChange}
        label='Esteem (-5 to +5)'
      />
      <label>
        <input name='isContact' type='checkbox' checked={character.isContact || false} onChange={handleOtherChange}></input>
        Contact?
      </label>

    </div>
  )
}