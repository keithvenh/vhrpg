import {useState} from 'react';
import FormInput from '../../../app/components/forms/FormInput';
import FormSelect from '../../../app/components/forms/FormSelect';
import FormTextArea from '../../../app/components/forms/FormTextarea';
import FormButton from '../../../app/components/forms/FormButton';

export default function Obligation({character, handler}) {
  const obligationObject = {status: '', value: 0, type: '', faction: '', description: ''}
  const [newObligation, setNewObligation] = useState(obligationObject)

  function handleObligationChange(index, field, event) {
    const value = event.target.value;
    const updatedObligation = character.obligation.map((item, i) =>
      i == index ? {...item, [field]: value} : item
    )
    handler({obligation: updatedObligation})
  }

  function handleNewObligationChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    setNewObligation(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  function handleNewObligationAdd() {
    const oldObligation = character.obligation || []
    const updatedObligation = [...oldObligation, newObligation];
    handler({obligation: updatedObligation})
    setNewObligation(obligationObject)
  }

  return (
    <div className='Obligation'>
      <h1>{character.name || character.displayName || "Character"} Obligation</h1>
      <div className='obligations'>
        {character.obligation?.map((oblig, index) => (
          <div key={index} className='obligation'>
            <FormSelect
              name='status'
              value={oblig.status}
              handler={(e) => handleObligationChange(index, 'status', e)}
            >
              <option value='' disabled>SELECT ONE</option>
              <option value='held'>Held</option>
              <option value='triggered'>Triggered</option>
              <option value='elevated'>Elevated</option>
              <option value='overdue'>Overdue</option>
              <option value='settled'>Settled</option>
            </FormSelect>

            <FormInput
              name='value'
              type='number'
              value={oblig.value}
              autofocus={true}
              handler={(e) => handleObligationChange(index, 'value', e)}
              label='Value'
            />

            <FormInput
              name='type'
              type='text'
              value={oblig.type}
              handler={(e) => handleObligationChange(index, 'type', e)}
              label='Type'
            />

            <FormSelect
              name='faction'
              value={oblig.faction}
              handler={(e) => handleObligationChange(index, 'faction', e)}
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
              value={oblig.description}
              handler={(e) => handleObligationChange(index, 'description', e)}
              placeholder='Obligation Description [Markdown Formatted]'
              label='Description'
            />


          </div>
        ))}
        <hr style={{width: '100%'}}/>
        <h2>Add a New Obligation</h2>
          <div className='obligation'>
            <FormSelect
              name='status'
              value={newObligation.status}
              handler={handleNewObligationChange}
            >
              <option value='' disabled>SELECT ONE</option>
              <option value='held'>Held</option>
              <option value='triggered'>Triggered</option>
              <option value='elevated'>Elevated</option>
              <option value='overdue'>Overdue</option>
              <option value='settled'>Settled</option>
            </FormSelect>

            <FormInput
              name='value'
              type='number'
              value={newObligation.value}
              handler={handleNewObligationChange}
              label='Value'
            />

            <FormInput
              name='type'
              type='text'
              value={newObligation.type}
              handler={handleNewObligationChange}
              label='Type'
            />

            <FormSelect
              name='faction'
              value={newObligation.faction}
              handler={handleNewObligationChange}
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
              value={newObligation.description}
              handler={handleNewObligationChange}
              placeholder='Obligation Description [Markdown Formatted]'
              label='Description'
              className='description'
            />


            <FormButton
              type='submit'
              label='Add Obligation'
              handler={handleNewObligationAdd}
            />
          </div>
      </div>
    </div>
  )
}