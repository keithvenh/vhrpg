import FormInput from "../../../app/components/forms/FormInput";
import FormTextArea from "../../../app/components/forms/FormTextarea";

export default function Appearance({character, handler}) {

  function handleAppearanceChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    handler({[field]: value})
  }
  return (
    <div className='Appearance'>
      <h1>{character.name || character.displayName || "Character"} Appearance</h1>
      <FormInput
        name='imageURL'
        type='text'
        value={character.imageURL || ''}
        autoFocus={true}
        handler={handleAppearanceChange}
        label='Image URL'
      />
      <FormTextArea
        name='appearance'
        type='text-area'
        value={character.appearance}
        handler={handleAppearanceChange}
        placeholder='Appearance Description [Markdown Formatted]'
        label='Appearance Description'
      />
    </div>
  )
}