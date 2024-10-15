import FormInput from "../../../app/components/forms/FormInput";
import FormTextArea from "../../../app/components/forms/FormTextarea";

export default function Appearance({vehicle, handler}) {

  function handleAppearanceChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    handler({[field]: value})
  }
  return (
    <div className='Appearance'>
      <h1>{vehicle.name || vehicle.displayName || "Vehicle"} Appearance</h1>
      <FormInput
        name='imageURL'
        type='text'
        value={vehicle.imageURL || ''}
        autoFocus={true}
        handler={handleAppearanceChange}
        label='Image URL'
      />
      <FormTextArea
        name='appearance'
        type='text-area'
        value={vehicle.appearance}
        handler={handleAppearanceChange}
        placeholder='Appearance Description [Markdown Formatted]'
        label='Appearance Description'
      />
    </div>
  )
}