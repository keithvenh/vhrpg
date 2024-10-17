import FormInput from '../../../app/components/forms/FormInput';
import FormTextArea from '../../../app/components/forms/FormTextarea';
import FormSelect from '../../../app/components/forms/FormSelect';

export default function Background({character, handler}) {

  function handleBackgroundChange(event) {
    const field = event.target.name
    const value = event.target.value
    handler({[field]: value})
  }

  return (
    <section className='Background'>

      <h1>{character.name || character.displayName || "Character"} Background</h1>

      <FormSelect
        name='type'
        value={character.type}
        handler={handleBackgroundChange}
      >
        <option value='pc'>Player Character</option>
        <option value='nemesis'>Nemesis</option>
        <option value='rival'>Rival</option>
        <option value='minion'>Minion</option>
      </FormSelect>

      <FormInput
        name='name'
        type='text'
        value={character.name || character.displayName || ''}
        autoFocus={true}
        handler={handleBackgroundChange}
        label='Character Name'
      />

      <FormInput
        name='nickname'
        type='text'
        value={character.nickname || character.displayName || ''}
        handler={handleBackgroundChange}
        label='Character Nickname'
      />

      <FormSelect
        name='faction'
        value={character.faction || ''}
        handler={handleBackgroundChange}
      >
        <option value='' disabled>SELECT ONE</option>
        <option value='black'>Black Sun</option>
        <option value='bounty'>Bounty Hunter's Guild</option>
        <option value='brethren'>Brethren of the Voidbound</option>
        <option value='cardas'>Car'Das Smuggling Ring</option>
        <option value='commerce'>Commerce Guild</option>
        <option value='empire'>Galactic Empire</option>
        <option value='hutt'>Hutt Cartel</option>
        <option value='neutral'>Neutral</option>
        <option value='rebel'>Rebel Alliance</option>
      </FormSelect>

      <FormTextArea
        name='background'
        type='text-area'
        value={character.background}
        handler={handleBackgroundChange}
        placeholder='Character Background [Markdown Formatted]'
        label='Character Background'
      />
      
    </section>
  )
}