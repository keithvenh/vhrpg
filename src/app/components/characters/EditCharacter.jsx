import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { charactersCollection } from '../../../db/application/db';

import Loading from '../loading/Loading';

// ===== IMPORT FORM FIELDS ===== //
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import TagInput from '../forms/TagInput';
import FormButton from '../forms/FormButton';

export default function EditCharacter() {
  const [ character, setCharacter ] = useState(null);
  const [form, setForm] = useState({
    displayName: '',
    type: '',
    imageURL: '',
    species: '',
    career: '',
    specializations: ['Advisor'],
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const characterTypeOptions = [
    {value: 'pc', display: 'PlayerCharacter'},
    {value: 'nemesis', display: 'Nemesis'},
    {value: 'rival', display: 'Rival'},
    {value: 'minion', display: 'Minion'}
  ]

  const careers = [
    {value: '', display: 'SELECT ONE'},
    {value: 'Explorer', display: 'Explorer'},
    {value: 'Guardian', display: 'Guardian'},
    {value: 'Hired Gun', display: 'Hired Gun'},
    {value: 'Mystic', display: 'Mystic'},
    {value: "Spy", display: 'Spy'},
    {value: 'Technicion', display: 'Technician'},
    {value: 'Consular', display: 'Sage'},
    {value: 'Colonist', display: 'Colonist'},
    {value: 'Smuggler', display: 'Smuggler'},
    {value: 'Bounty Hunter', display: 'Bounty Hunter'}
  ]

  const specializations = ['Advisor', 'Ataru Striker', 'Captain of the Guard', 'Modder', 'Force Sensitive', 'Infiltrator', 'Bodyguard', 'Sage', 'Peacekeeper', 'Planetary Defense Force Officer', 'Mechanic', 'Imperial Academy Cader', 'Sleeper Agent']

  async function getCharacter(characterID) {
    const c = (await getDoc(doc(charactersCollection, characterID)));
    setCharacter({
      ...c.data(),
      id: c.id
    });
    setForm({
      ...form,
      ...c.data()
    })
  }

  function handleFormChange(e) {
    console.log(e)
    if (e && e.target) {  // This means it's from an input event
        console.log(e.target.name, e.target.value);
        setForm(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
    } else {  // It's directly the tags array from onTagChange
        console.log(e);
        setForm(prev => ({
          ...prev,
          specializations: e  // Assuming specializations is the name for tags
        }));
    }
}


  async function updateCharacter(editedCharacter) {
      try {
          // Create a reference to the character document using its ID
          const charDocRef = doc(charactersCollection, character.id);

          // Update the document in the database
          await updateDoc(charDocRef, editedCharacter);

          console.log("Document updated with ID: ", character.id);
          navigate(`/characters/${character.id}`)
      } catch (error) {
          console.error("Error updating document: ", error);
      }
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateCharacter(form);
  }

  useEffect(() => {
    getCharacter(id);
  }, [id])

  if (!form || !character) {
    return <Loading />
  }

  return (
    <div className='characterContainer'>
            
      <div className='characterDetails'>

        <div className='characterOverview'>

            <div className='characterImageContainer'>
                <img className='characterImage' src={form.imageURL || 'https://i.imgur.com/tdi3NGa.png'} alt='' />
            </div>
            <div className='characterTitle'>
                <div className='characterName'>
                    <h1>{form.displayName}</h1>
                    <p className='sw'>{form.displayName}</p>
                </div>
                <FormInput 
                  name='displayName'
                  label='Character Name'
                  value={form.displayName}
                  handler={handleFormChange}
                  autoFocus={true}
                />
                <FormSelect
                  name='type'
                  label='Character Type'
                  value={form.type}
                  handler={handleFormChange}
                  options={characterTypeOptions} 
                />
                <FormInput
                  name='imageURL'
                  label='Image URL'
                  value={form.imageURL}
                  handler={handleFormChange}
                />
                <FormInput
                  name='species'
                  label='Species'
                  value={form.species}
                  handler={handleFormChange}
                />
                {form.type === 'pc' ?
                  <>
                    <FormSelect
                      name='career'
                      label='Career'
                      value={form.career}
                      handler={handleFormChange}
                      options={careers}
                    />
                    <TagInput 
                      name='specializations'
                      tags={form.specializations} 
                      onTagsChange={handleFormChange} 
                      options={specializations}/>
                  </> : ''}
 
            </div>
          </div>
        </div>
        <div style={{marginTop: '240px'}}>
          <FormButton
            type='submit'
            label='Update Character'
            handler={handleSubmit}
        />

        </div>
{/* testing

                        <div className='characterImageContainer'>
                            <img className='characterImage' src={this.state.image} alt='' />
                        </div>

                    </div>
                    <div className="divider">
                        <hr className="dividerLine"></hr>
                        <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Attributes</p>
                        <hr className="dividerLine"></hr>
                    </div>
                    <div className='characterAttributes'>
                        <div className='derived' id="attributes">
                            <div className="attributeContainer soak">
                                <div className="label">Soak</div>
                                <div className="values">
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.soak}</p>
                                        <div className="sublabel">Current</div>
                                    </div>
                                </div>
                            </div>

                            <div className="attributeContainer wounds">
                                <div className="label">Wounds</div>
                                <div className="values">
                                    <div className='threshold'>
                                        <p className='value'>{this.props.character.attributes.woundThreshold}</p>
                                        <div className="sublabel">Threshold</div>
                                    </div>
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.wounds}</p>
                                        <div className="sublabel">Current</div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="attributeContainer strain">
                                <div className="label">Strain</div>
                                <div className="values">
                                    <div className='threshold'>
                                        <p className='value'>{this.props.character.attributes.strainThreshold}</p>
                                        <div className="sublabel">Threshold</div>
                                    </div>
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.strain}</p>
                                        <div className="sublabel">Current</div>
                                    </div>
                                </div>
                            </div>

                            <div className="attributeContainer defense">
                                <div className="label">Defense</div>
                                <div className="values">
                                    <div className='threshold'>
                                        <p className='value'>{this.props.character.attributes.rangedDefense}</p>
                                        <div className="sublabel">Ranged</div>
                                    </div>
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.meleeDefense}</p>
                                        <div className="sublabel">Melee</div>
                                    </div>
                                </div>
                            </div>

                            <div className="attributeContainer forceRating">
                                <div className="label">Force Rating</div>
                                <div className="values">
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.forceRating}</p>
                                        <div className="sublabel">Current</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="divider">
                            <hr className="dividerLine"></hr>
                            <p className="dividerLabel"  onClick={(e) => this.collapseElement(e)}>Characteristics</p>
                            <hr className="dividerLine"></hr>
                        </div>

                        <div className='characteristics' id='characteristics'>

                            <div  className='characteristic brawn'>
                                <p className='rank'>{this.props.character.characteristics.brawn }</p>
                                <p className='label'>Brawn</p>
                            </div>

                            <div  className='characteristic agility'>
                                <p className='rank'>{this.props.character.characteristics.agility }</p>
                                <p className='label'>Agility</p>
                            </div>

                            <div  className='characteristic intellect'>
                                <p className='rank'>{this.props.character.characteristics.intellect }</p>
                                <p className='label'>Intellect</p>
                            </div>

                            <div  className='characteristic cunning'>
                                <p className='rank'>{this.props.character.characteristics.cunning }</p>
                                <p className='label'>Cunning</p>
                            </div>

                            <div  className='characteristic willpower'>
                                <p className='rank'>{this.props.character.characteristics.willpower }</p>
                                <p className='label'>Willpower</p>
                            </div>

                            <div  className='characteristic presence'>
                                <p className='rank'>{this.props.character.characteristics.presence }</p>
                                <p className='label'>Presence</p>
                            </div>

                        </div>
                    </div>

                    <div className="divider">
                        <hr className="dividerLine"></hr>
                        <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Skills</p>
                        <hr className="dividerLine"></hr>
                    </div>
                    <div className='characterSkills' id='skills'>
                        {/*map over array and return list of skills and their ranks.
                        <div className='skillsRow'>
                            <div className="divider">
                                <hr className="dividerLine"></hr>
                                <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>General</p>
                                <hr className="dividerLine"></hr>
                            </div>
                            <div className='generalSkills'  id='general'>

                                {this.state.skillList.filter(skill => skill.category === "General").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

                            </div>
                        </div>

                        <div className='skillsRow'>
                            <div className="divider">
                                <hr className="dividerLine"></hr>
                                <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Combat</p>
                                <hr className="dividerLine"></hr>
                            </div>
                            <div className='combatSkills' id='combat'>
                                
                                {this.state.skillList.filter(skill => skill.category === "Combat").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

                            </div>

                            <div className="divider">
                                <hr className="dividerLine"></hr>
                                <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Knowledge</p>
                                <hr className="dividerLine"></hr>
                            </div>

                            <div className='knowledgeSkills' id='knowledge'>
                                
                                {this.state.skillList.filter(skill => skill.category === "Knowledge").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider">
                    <hr className="dividerLine"></hr>
                    <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Talents</p>
                    <hr className="dividerLine"></hr>
                </div>
                <div className='character-talents' id='talentsß'>
                    {/* WE NEED TO FIGURE OUT HOW TO LOOP THROUGH props.character.talents
                                </div> */}
              </div>
  )
}