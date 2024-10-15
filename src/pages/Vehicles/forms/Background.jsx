import FormInput from '../../../app/components/forms/FormInput';
import FormTextArea from '../../../app/components/forms/FormTextarea';
import FormSelect from '../../../app/components/forms/FormSelect';

export default function Background({vehicle, handler}) {

  function handleCheckboxChange(event) {
    const field = event.target.name
    const value = !vehicle[field]
    handler({[field]: value})
  }

  function handleBackgroundChange(event) {
    const field = event.target.name
    const value = event.target.value
    handler({[field]: value})
  }

  return (
    <section className='Background'>

      <h1>{vehicle.name || vehicle.displayName || "Vehicle"} Background</h1>

      <label>
        <input name='isTemplate' type='checkbox' checked={vehicle.isTemplate} onChange={handleCheckboxChange} />
        Vehicle Is a Template?
      </label>

      <FormSelect
        name='designation'
        value={vehicle.designation || ''}
        handler={handleBackgroundChange}
        label='Designation'
      >
        <option value='' disabled>SELECT ONE</option>
        <option value='vehicle'>Vehicle</option>
        <option value='starship'>Starship</option>
      </FormSelect>

      <FormInput
        name='name'
        type='text'
        value={vehicle.name || vehicle.displayName || ''}
        autoFocus={true}
        handler={handleBackgroundChange}
        label='Vehicle Name'
      />

      <FormInput
        name='nickname'
        type='text'
        value={vehicle.nickname || vehicle.displayName || ''}
        handler={handleBackgroundChange}
        label='Vehicle Nickname'
      />

      <FormInput
        name='type'
        type='text'
        value={vehicle.type || ''}
        handler={handleBackgroundChange}
        label='Vehicle Hull Type'
      />
      <FormInput
        name='model'
        type='text'
        value={vehicle.model || ''}
        handler={handleBackgroundChange}
        label='Vehicle Model'
      />
      <FormInput
        name='manufacturer'
        type='text'
        value={vehicle.manufacturer || ''}
        handler={handleBackgroundChange}
        label='Vehicle Manufacturer'
      />

      <FormInput
        name='cost'
        type='number'
        value={vehicle.cost || 0}
        handler={handleBackgroundChange}
        label='Vehicle Cost'
      />
      <FormInput
        name='rarity'
        type='number'
        value={vehicle.rarity || 0}
        handler={handleBackgroundChange}
        label='Vehicle Rarity'
      />

      <label>
        <input name='restricted' type='checkbox' checked={vehicle.restricted} onChange={handleCheckboxChange} />
        Vehicle Is Restricted?
      </label>
      
    </section>
  )
}