import FormInput from "../../../app/components/forms/FormInput";

export default function Attributes({vehicle, handler}) {

  function handleAttributeChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    handler({[field]: value})
  }

  return (
    <div className='Attributes'>
      <h1>{vehicle.name || vehicle.displayName || "Vehicle"} Attributes</h1>
      <FormInput
        name='hullTraumaThreshold'
        type='number'
        value={vehicle.hullTraumaThreshold || 0}
        autoFocus={true}
        handler={handleAttributeChange}
        label='Hull Trauma Theshold'
      />
      <FormInput
        name='hullTraumaCurrent'
        type='number'
        value={vehicle.hullTraumaCurrent || 0}
        handler={handleAttributeChange}
        label='Current Hull Trauma'
      />

      <FormInput
        name='systemStrainThreshold'
        type='number'
        value={vehicle.systemStrainThreshold || 0}
        handler={handleAttributeChange}
        label='System Strain Theshold'
      />
      <FormInput
        name='systemStrainCurrent'
        type='number'
        value={vehicle.systemStrainCurrent || 0}
        handler={handleAttributeChange}
        label='Current System Strain'
      />

      <FormInput
        name='defenseFore'
        type='number'
        value={vehicle.defenseFore || 0}
        handler={handleAttributeChange}
        label='Fore Defense'
      />
      <FormInput
        name='defensePort'
        type='number'
        value={vehicle.defensePort || 0}
        handler={handleAttributeChange}
        label='Port Defense'
      />
      <FormInput
        name='defenseStarboard'
        type='number'
        value={vehicle.defenseStarboard || 0}
        handler={handleAttributeChange}
        label='Starboard Defense'
      />
      <FormInput
        name='defenseAft'
        type='number'
        value={vehicle.defenseAft || 0}
        handler={handleAttributeChange}
        label='Aft Defense'
      />

      <FormInput
        name='armor'
        type='number'
        value={vehicle.armor || 0}
        handler={handleAttributeChange}
        label='Armor'
      />

      <FormInput
        name='encumbranceThreshold'
        type='number'
        value={vehicle.encumbranceThreshold || 0}
        handler={handleAttributeChange}
        label='Encumbrance Threshold'
      />
      <FormInput
        name='encumbranceCurrent'
        type='number'
        value={vehicle.encumbranceCurrent || 0}
        handler={handleAttributeChange}
        label='Current Encumbrance'
      />
    </div>
  )
}