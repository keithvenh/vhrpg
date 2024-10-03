import FormInput from '../../../app/components/forms/FormInput';
import FormTextArea from '../../../app/components/forms/FormTextarea';

export default function Background({character, handler}) {
  return (
    <section className='background'>
      <h1>{character.name || character.displayName || "Character"} Background</h1>
      <FormInput
        name='name'
        type='text'
        value={character.name || character.displayName}
        autoFocus={true}
        handler={handler}
        label='Character Name'
      />

      <FormTextArea
        name='background'
        type='text-area'
        value={character.background}
        handler={handler}
        autoFocus={false}
        placeholder='Character Background [Markdown Formatted]'
        label='Character Background'
      />
    </section>
  )
}