import {useState} from 'react';
import FormInput from '../../../app/components/forms/FormInput';
import FormSelect from '../../../app/components/forms/FormSelect';
import FormTextArea from '../../../app/components/forms/FormTextarea';
import FormButton from '../../../app/components/forms/FormButton';

export default function Motivations({character, handler}) {
  const motivationObject = {category: '', type: '', faction: '', description: ''}
  const [newMotivation, setNewMotivation] = useState(motivationObject)

  function handleMotivationChange(index, field, event) {
    const value = event.target.value;
    const updatedMotivation = character.motivation.map((item, i) =>
      i == index ? {...item, [field]: value} : item
    )
    handler({motivation: updatedMotivation})
  }

  function handleNewMotivationChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    setNewMotivation(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  function handleNewMotivationAdd() {
    const oldMotivation = character.motivation || []
    const updatedMotivation = [...oldMotivation, newMotivation];
    handler({motivation: updatedMotivation})
    setNewMotivation(motivationObject)
  }

  return (
    <div className='Motivation'>
      <h1>{character.name || character.displayName || "Character"} Motivation</h1>
      <div className='motivations'>
        {character.motivation?.map((motive, index) => (
          <div key={index} className='motivation'>

            <FormInput
              name='category'
              type='text'
              value={motive.category}
              autofocus={true}
              handler={(e) => handleObligationChange(index, 'category', e)}
              label='Category'
            />

            <FormInput
              name='type'
              type='text'
              value={motive.type}
              handler={(e) => handleMotivationChange(index, 'type', e)}
              label='Type'
            />

            <FormSelect
              name='faction'
              value={motive.faction}
              handler={(e) => handleMotivationChange(index, 'faction', e)}
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
              name='description'
              type='text-area'
              value={motive.description}
              handler={(e) => handleMotivationChange(index, 'description', e)}
              placeholder='Motivation Description [Markdown Formatted]'
              label='Description'
            />


          </div>
        ))}
        <hr style={{width: '100%'}}/>
        <h2>Add a New Motivation</h2>
          <div className='motivation'>

            <FormInput
              name='category'
              type='text'
              value={newMotivation.value}
              handler={handleNewMotivationChange}
              label='Category'
            />

            <FormInput
              name='type'
              type='text'
              value={newMotivation.type}
              handler={handleNewMotivationChange}
              label='Type'
            />

            <FormSelect
              name='faction'
              value={newMotivation.faction}
              handler={handleNewMotivationChange}
              label='Faction'
            >
              <option value='' disabled>SELECT ONE</option>
              <option value='neutral'>Neutral</option>
              <option value='black'>Black Sun</option>
              <option value='bounty'>Bounty Hunter's Guild</option>
              <option value='brethren'>Brethren of the Voidbound</option>
              <option value='cardas'>Car'Das Smuggling Ring</option>
              <option value='commerce'>Commerce Guild</option>
              <option value='empire'>Galactic Empire</option>
              <option value='hutt'>Hutt Cartel</option>
              <option value='rebel'>Rebel Alliance</option>
            </FormSelect>
            

            <FormTextArea
              name='description'
              type='text-area'
              value={newMotivation.description}
              handler={handleNewMotivationChange}
              placeholder='Motivation Description [Markdown Formatted]'
              label='Description'
            />


            <FormButton
              type='submit'
              label='Add Motivation'
              handler={handleNewMotivationAdd}
            />
          </div>
      </div>
    </div>
  )
}