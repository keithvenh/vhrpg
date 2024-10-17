import { fetchAllTalents, fetchTalent } from "../../../services/talents"
import FormButton from "../../../app/components/forms/FormButton";
import FormSelect from "../../../app/components/forms/FormSelect";
import FormInput from "../../../app/components/forms/FormInput";
import FormTextArea from "../../../app/components/forms/FormTextarea";
import { useState } from 'react';

export default function Talents({character, handler}) {
  const allTalents = fetchAllTalents();
  const [newTalent, setNewTalent] = useState({})
  const [customTalent, setCustomTalent] = useState({isCustom: true})
  const [newAbility, setNewAbility] = useState({})

  function handleTalentChange(index, event) {
    const talent = fetchTalent(event.target.value);
    let talents = character.talents || []
    talents[index] = talent
    handler({talents})
  }

  function handleCustomTalentChange(index, event) {
    const checkboxes = ['isActive', 'isRanked', 'isForceOnly']
    const field = event.target.name
    let value = event.target.value
    if(checkboxes.includes(field)) {value = event.target.checked}
    let talents = character.talents || []
    let talent = character.talents[index]
    talent = {
      ...talent,
      [field]: value
    }
    talents[index] = talent
    handler({talents})
  }

  function handleNewTalentChange(event) {
    const talent = fetchTalent(event.target.value);
    setNewTalent(talent);
  }

  function handleNewCustomTalent(event) {
    const checkboxes = ['isActive', 'isRanked', 'isForceOnly']
    const field = event.target.name
    let value = event.target.value
    if(checkboxes.includes(field)) {value = event.target.checked}
    setCustomTalent(prevState => ({
      ...prevState,
      [field]: value,
      isCustom: true
    }))
  }

  function handleTalentAdd(type) {
    let talents = character.talents || []
    if(type='new') {
      talents.push(newTalent)
    }
    if(type='custom') {
      talents.push(customTalent)
    }
    handler({talents})
  }

  return (
    <div className='Talents'>
      <h1>{character.name || character.displayName || "Character"} Talent</h1>
      {character.talents?.map((talent, index) => {
        if(!talent.isCustom) {
          return (
            <FormSelect
              key={index}
              name='talent'
              value={talent.id}
              handler={(e) => handleTalentChange(index, e)}
              options={allTalents.map(tal => ({value: tal.id, display: tal.name})).sort((a,b) => a.display.localeCompare(b.display))}
            ><option value='' disabled>SELECT ONE</option></FormSelect>
          )
        }
      })}
      <div className='custom-talents'>
        <h2>Custom Talents</h2>
        {character.talents?.map((talent,index) => {
          if(talent.isCustom) {
            return (
              <div className='custom-talent'>
                <FormInput
                  name='name'
                  type='text'
                  value={talent.name || ''}
                  handler={(e) => handleCustomTalentChange(index, e)}
                  label='Custom Talent Name'
                />
                <FormSelect
                  name='activationType'
                  value={talent.activationType || ''}
                  handler={(e) => handleCustomTalentChange(index, e)}
                  label='Activation Type'
                >
                  <option value='' disabled>SELECT ONE</option>
                  <option value='Passive' disabled>Passive</option>
                  <option value='Incidental' disabled>Incidental</option>
                  <option value='Maneuver' disabled>Maneuver</option>
                  <option value='Action' disabled>Action</option>
                </FormSelect>
                <FormTextArea
                  name='descriptionShort'
                  type='text-area'
                  value={talent.descriptionShort || ''}
                  handler={(e) => handleCustomTalentChange(index, e)}
                  placeholder="Description [Markdown Formatted]"
                  label='Custom Talent Description'
                />
                <div className='custom-talent-markers'>
                  <label>
                    <input name='isActive' type='checkbox' checked={talent.isActive || false} onChange={(e) => handleCustomTalentChange(index, e)}></input>
                    Active?
                  </label>
                  <label>
                    <input name='isForceOnly' type='checkbox' checked={talent.isForceOnly || false} onChange={(e) => handleCustomTalentChange(index, e)}></input>
                    Force Only?
                  </label>
                  <label>
                    <input name='isRanked' type='checkbox' checked={talent.isRanked || false} onChange={(e) => handleCustomTalentChange(index, e)}></input>
                    Ranked?
                  </label>
                  <label>
                    <input name='isCustom' type='checkbox' checked={true} readOnly></input>
                    Custom?
                  </label>
                </div>
              </div>
            )
          }
        })}

      </div>

      <hr />
      <h2>Add a Talent</h2>
      <FormSelect
        name='talent'
        value={newTalent.id || ''}
        handler={handleNewTalentChange}
        options={allTalents.map(tal => ({value: tal.id, display: tal.name})).sort((a,b) => a.display.localeCompare(b.display))}
      ><option value='' disabled>SELECT ONE</option></FormSelect>
      <FormButton
        type='submit'
        label='Add Talent'
        handler={() => handleTalentAdd('new')}
      />

      <hr />
      <h2>Add a Custom Talent</h2> 
      <div className='custom-talent'>
        <FormInput
          name='name'
          type='text'
          value={customTalent.name || ''}
          handler={handleNewCustomTalent}
          label='Custom Talent Name'
        />
        <FormSelect
          name='activationType'
          value={customTalent.activationType || ''}
          handler={handleNewCustomTalent}
          label='Activation Type'
        >
          <option value='' disabled>SELECT ONE</option>
          <option value='Passive'>Passive</option>
          <option value='Incidental'>Incidental</option>
          <option value='Maneuver'>Maneuver</option>
          <option value='Action'>Action</option>
        </FormSelect>
        <FormTextArea
          name='descriptionShort'
          type='text-area'
          value={customTalent.descriptionShort || ''}
          handler={handleNewCustomTalent}
          placeholder="Description [Markdown Formatted]"
          label='Custom Talent Description'
        />
        <div className='custom-talent-markers'>
          <label>
            <input name='isActive' type='checkbox' checked={customTalent.isActive || false} onChange={handleNewCustomTalent}></input>
            Active?
          </label>
          <label>
            <input name='isForceOnly' type='checkbox' checked={customTalent.isForceOnly || false} onChange={handleNewCustomTalent}></input>
            Force Only?
          </label>
          <label>
            <input name='isRanked' type='checkbox' checked={customTalent.isRanked || false} onChange={handleNewCustomTalent}></input>
            Ranked?
          </label>
          <label>
            <input name='isCustom' type='checkbox' checked={true} readOnly></input>
            Custom?
          </label>
        </div>
        <FormButton
          type='submit'
          label='Add Custom Talent'
          handler={() => handleTalentAdd('custom')}
        /> 
      </div>
       
    </div>
  )
}