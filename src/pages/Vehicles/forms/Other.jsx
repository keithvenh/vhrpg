import FormInput from "../../../app/components/forms/FormInput";
import FormSelect from '../../../app/components/forms/FormSelect';

export default function Other({vehicle, handler}) {

  function handleOtherChange(event) {
    const field = event.target.name;
    let value = event.target.value;
    handler({[field]: value})
  }

  function handleComplementChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const complement = vehicle.complement || {}
    handler({complement: {
      ...complement,
      [field]: value
    }})
  }

  function handleConsumablesChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const consumables = vehicle.consumables || {}
    handler({consumables: {
      ...vehicle.consumables,
      [field]: value
    }})
  }

  function calculateConsumables() {
    const duration = vehicle.consumables?.duration || 'months';
    let days = vehicle.consumables?.value;
    if(duration == 'months') {
      days = 35 * vehicle.consumables?.value;
    } else if (duration == 'years') {
      days = 368 * vehicle.consumables?.value;
    }
    const units = days * (parseInt(vehicle.complement?.total) + parseInt(vehicle.passengers))
    return units;
  }

  return (
    <div className='Other'>
      <h1>{vehicle.name || vehicle.displayName || "Vehicle"} Other Information</h1>
      <FormInput
        name='total'
        type='number'
        value={vehicle.complement?.total || 1}
        autoFocus={true}
        handler={handleComplementChange}
        label='Total Complement'
      />
      <FormInput
        name='pilot'
        type='number'
        value={vehicle.complement?.pilot || 1}
        handler={handleComplementChange}
        label='Pilot(s)'
      />
      <FormInput
        name='copilot'
        type='number'
        value={vehicle.complement?.copilot || 0}
        handler={handleComplementChange}
        label='Co-Pilot(s)'
      />
      <FormInput
        name='gunner'
        type='number'
        value={vehicle.complement?.gunner || 0}
        handler={handleComplementChange}
        label='Gunners'
      />

      <FormInput
        name='cargoMaster'
        type='number'
        value={vehicle.complement?.cargoMaster || 0}
        handler={handleComplementChange}
        label='Cargo Master(s)'
      />
      <FormInput
        name='engineer'
        type='number'
        value={vehicle.complement?.engineer || 0}
        handler={handleComplementChange}
        label='Engineer(s)'
      />
      <FormInput
        name='operator'
        type='number'
        value={vehicle.complement?.operator || 0}
        handler={handleComplementChange}
        label='Sensor/Comms Operator'
      />

      <FormInput
        name='guard'
        type='number'
        value={vehicle.complement?.guard || 0}
        handler={handleComplementChange}
        label='Guard(s)'
      />

      <FormInput
        name='navigator'
        type='number'
        value={vehicle.complement?.navigator || 0}
        handler={handleComplementChange}
        label='Navigator(s)'
      />
      <FormInput
        name='crew'
        type='number'
        value={vehicle.complement?.crew || 0}
        handler={handleComplementChange}
        label='Crew'
      />
      <FormInput
        name='captain'
        type='number'
        value={vehicle.complement?.captain || 0}
        handler={handleComplementChange}
        label='Captain(s)'
      />
      <FormInput
        name='officer'
        type='number'
        value={vehicle.complement?.officer || 0}
        handler={handleComplementChange}
        label='Officer(s)'
      />
      <FormInput
        name='other'
        type='number'
        value={vehicle.complement?.other || 0}
        handler={handleComplementChange}
        label='Other Complement(s)'
      />
      <FormInput
        name='passengers'
        type='number'
        value={vehicle.passengers || 0}
        handler={handleOtherChange}
        label='Passengers'
      />
      <FormInput
        name='value'
        type='number'
        value={vehicle.consumables?.value || 0}
        handler={handleConsumablesChange}
        label='Consumables Value'
      />
      <FormSelect
        name='duration'
        value={vehicle.consumables?.duration || 'months'}
        handler={handleConsumablesChange}
        label='Consumable Duration'
      >
        <option value='days'>Days</option>
        <option value='months'>Months</option>
        <option value='years'>Years</option>
      </FormSelect>
      <p>Consumable Unit Formula: units = days * (complement + passengers)</p>
      <p>1 Month = 35 Days | 1 Year = 368 Days</p>
      <p>Estimated Consumables = {calculateConsumables() || 0}</p>
      <FormInput
        name='units'
        type='number'
        value={vehicle.consumables?.units || 0}
        handler={handleConsumablesChange}
        label='Consumable Units'
      />

    </div>
  )
}