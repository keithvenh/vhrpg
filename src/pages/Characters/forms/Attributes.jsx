import FormInput from "../../../app/components/forms/FormInput";

export default function Attributes({character, handler}) {

  function handleAttributeChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    handler({[field]: value})
  }

  return (
    <div className='Attributes'>
      <h1>{character.name || character.displayName || "Character"} Attributes</h1>
      <FormInput
        name='woundsThreshold'
        type='number'
        value={character.woundsThreshold || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Wound Theshold'
      />
      <FormInput
        name='woundsCurrent'
        type='number'
        value={character.woundsCurrent || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Current Wounds'
      />

      <FormInput
        name='strainThreshold'
        type='number'
        value={character.strainThreshold || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Strain Theshold'
      />
      <FormInput
        name='strainCurrent'
        type='number'
        value={character.strainCurrent || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Current Strain'
      />

      <FormInput
        name='defenseMelee'
        type='number'
        value={character.defenseMelee || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Melee Defense'
      />
      <FormInput
        name='defenseRanged'
        type='number'
        value={character.defenseRanged || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Ranged Defense'
      />

      <FormInput
        name='soak'
        type='number'
        value={character.soak || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Soak'
      />

      <FormInput
        name='encumbranceThreshold'
        type='number'
        value={character.encumbranceThreshold || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Encumbrance Threshold'
      />
      <FormInput
        name='encumbranceCurrent'
        type='number'
        value={character.encumbranceCurrent || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Current Encumbrance'
      />
    </div>
  )
}