import FormInput from "../../../app/components/forms/FormInput";
import FormSelect from '../../../app/components/forms/FormSelect';

export default function Characteristics({vehicle, handler}) {

  function handleCheckboxChange(event) {
    const field = event.target.name
    const value = !vehicle[field]
    handler({[field]: value})
  }

  function handleCharacteristicChange(event) {
    const field = event.target.name
    const value = event.target.value
    handler({[field]: value})
  }
  return (
    <div className='Characteristics'>
      <h1>{vehicle.name || vehicle.displayName || "Vehicle"} Characteristics</h1>
      <FormInput
        name='silhouette'
        type='number'
        value={vehicle.silhouette || 0}
        autoFocus={true}
        handler={handleCharacteristicChange}
        label='Silhouette'
      />
      <FormInput
        name='speedThreshold'
        type='number'
        value={vehicle.speedThreshold || 0}
        handler={handleCharacteristicChange}
        label='Speed Threshold'
      />
      <FormInput
        name='speedCurrent'
        type='number'
        value={vehicle.speedCurrent || 0}
        handler={handleCharacteristicChange}
        label='Current Speed'
      />
      <FormInput
        name='handling'
        type='number'
        value={vehicle.handling || 0}
        handler={handleCharacteristicChange}
        label='Handling'
      />
      <FormInput
        name='hyperdrivePrimary'
        type='number'
        value={vehicle.hyperdrivePrimary || 0}
        handler={handleCharacteristicChange}
        label='Primary Hyperdrive'
      />
      <FormInput
        name='hyperdriveSecondary'
        type='number'
        value={vehicle.hyperdriveSecondary || 0}
        handler={handleCharacteristicChange}
        label='Secondary Hyperdrive'
      />

      <FormSelect
        name='sensorRange'
        value={vehicle.sensorRange || ''}
        handler={handleCharacteristicChange}
        label='Sensor Range'
      >
        <option value='' disabled>SELECT ONE</option>
        <option value='close'>Close</option>
        <option value='short'>Short</option>
        <option value='medium'>Medium</option>
        <option value='long'>Long</option>
        <option value='Extreme'>Extreme</option>
      </FormSelect>

      <label>
        <input type='checkbox' checked={vehicle.navicomputer} onChange={handleCheckboxChange} />
        Vehicle Has Navicomputer?
      </label>

      <FormInput
        name='hardPoints'
        type='number'
        value={vehicle.hardPoints || 0}
        handler={handleCharacteristicChange}
        label='Vehicle Hard Points'
      />
      <FormInput
        name='hardPointsUsed'
        type='number'
        value={vehicle.hardPointsUsed || 0}
        handler={handleCharacteristicChange}
        label='Vehicle Hard Points Used'
      />
      
    </div>
  )
}