import { fetchAllForcePowers, fetchForcePower } from "../../../services/forcePowers"
import FormButton from "../../../app/components/forms/FormButton";
import FormSelect from "../../../app/components/forms/FormSelect";
import { useState } from 'react';
import FormInput from "../../../app/components/forms/FormInput";

export default function ForcePowers({character, handler}) {
  const allForcePowers = fetchAllForcePowers();
  const [newForcePower, setNewForcePower] = useState('')

  function handleForceRatingChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    handler({[field]: value})
  }

  function handleForcePowerChange(index, event) {
    const forcePower = fetchForcePower(event.target.value);
    let forcePowers = character.forcePowers || []
    forcePowers[index] = forcePower
    handler({forcePowers})
  }

  function handleNewForcePowerChange(event) {
    setNewForcePower(event.target.value)
  }

  function handleAddForcePower() {
    const forcePower = fetchForcePower(newForcePower);
    let forcePowers = character.forcePowers || []
    handler({
      forcePowers: [
        ...forcePowers,
        forcePower
      ]
    })
    setNewForcePower('');
  }
  return (
    <div className='ForcePowers'>
      <h1>{character.name || character.displayName || "Character"} ForcePowers</h1>
      <FormInput
        name='forceRating'
        type='number'
        value={character.forceRating || 0}
        autoFocus={true}
        handler={handleForceRatingChange}
        label='Force Rating'
      />
      <FormInput
        name='forceCommitted'
        type='number'
        value={character.forceCommitted || 0}
        handler={handleForceRatingChange}
        label='Force Dice Committed'
      />

      {character.forcePowers?.map((forcePower, index) => (
        <FormSelect
          key={index}
          name='forcePower'
          value={forcePower.id}
          handler={(e) => handleForcePowerChange(index, e)}
          options={allForcePowers.map(fp => ({value: fp.id, display: fp.name})).sort((a,b) => a.display.localeCompare(b.display))}
        ><option value='' disabled>SELECT ONE</option></FormSelect>
      ))}
      <hr />
      <h2>Add a Force Power</h2>
      <FormSelect
        name='addForcePower'
        value={newForcePower}
        handler={handleNewForcePowerChange}
        options={allForcePowers.map(fp => ({value: fp.id, display: fp.name})).sort((a,b) => a.display.localeCompare(b.display))}
      ><option value='' disabled>SELECT ONE</option></FormSelect>
      <FormButton
        type='submit'
        label='Add Force Power'
        handler={handleAddForcePower}
      />  
    </div>
  )
}