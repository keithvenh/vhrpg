import FormInput from '../../../app/components/forms/FormInput';
import FormTextArea from '../../../app/components/forms/FormTextarea';

export default function Background({name, background, handler}) {
  return (
    <section className='background'>
      <FormInput
        name='character-name'
        type='text'
        value={name}
        autoFocus={true}
        handler={handler}
      />

      <FormTextArea
        name='background'
        type='text-area'
        value={background}
        handler={handler}
        autoFocus={false}
        placeholder='Character Background [Markdown Formatted]'
        label='Character Background'
      />
    </section>
  )
}