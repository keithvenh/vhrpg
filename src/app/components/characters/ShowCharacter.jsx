import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import {charactersCollection} from '../../../db/application/db';

import Loading from '../loading/Loading';
import Divider from './Divider';
import CharacterField from './CharacterField';
import Tags from '../../helpers/application/Tags';

export default function ShowCharacter() {
  const [character, setCharacter] = useState();
  const { id } = useParams();
  const [skillsFilter, setSkillsFilter] = useState(['ranked', 'career', 'unranked', 'non-career'])

  const characterTypes = {
    'pc': 'Player Character',
    'nemesis': 'Nemesis',
    'rival': 'Rival',
    'minion': 'Minion'
  }

  function updateSkillsFilter(event) {
    const filter = event.target.value;
    let newFilter = [...skillsFilter];
    if(newFilter.includes(filter)) {
      setSkillsFilter(newFilter.filter((f) => f !== filter));
      return;
    }
    setSkillsFilter([...skillsFilter, filter]);
  }

  function collapseSection(section) {
    const element = document.getElementById(section);
    element.classList.contains('collapsed') ?
      element.classList.remove('collapsed') :
      element.classList.add('collapsed'); 
  }

  async function getCharacter(characterID) {
    const c = await getDoc(doc(charactersCollection, characterID));
    setCharacter({
      ...c.data(),
      id: c.id,
    });
  }

  useEffect(() => {
    getCharacter(id);
  }, [id])

  if(!character) return <Loading />

  return (
    <div className="showCharacter">

      <Link to={`/characters/${character.id}/edit`}>
        <div className='editButton'>
          <i className='fas fa-pencil'></i> Edit
        </div>
      </Link>

      <div className='characterLeft'>
        <h1 className='characterName'>
          {character.displayName}
          <span className='characterType'>[{character.type}]</span>
        </h1>

        <div className='characterOverview'>
          <div className="characterImageContainer">
            <img
              className="characterImage"
              src={character.imageURL || "https://i.imgur.com/tdi3NGa.png"}
              alt={`${character.displayName} image`}
            />
          </div>
          <div className='characterOverviewData'>
            <CharacterField label='Species' value={character.species}/>
            <CharacterField label='Career' value={character.career} />
            <CharacterField label='Specializations' value={
              (
                <Tags tagList={character.specializations} classList={'selected'} />
              )
            } />
          </div>
        </div>
        <div className="showCharacterTitleContainer">
        </div>

        <Divider label='Overview' collapseSection={collapseSection}/>
        
        <div className='characterSection' id='Overview'>





        </div>

        <Divider label='Description' />

      </div>

      <div className='characterCenter'>

        <Divider label='Skills' />

        <div className='skillsFilter'>
          <input
              name='skillsFilter'
              id='ranked'
              className={`input checkboxInput skillsFilterCheckboxInput`}
              type='checkbox'
              value='ranked'
              checked={skillsFilter.includes('ranked')}
              onChange={updateSkillsFilter}
          />
          <label 
              className={`checkboxLabel skillFilterCheckboxLabel`}
              htmlFor='ranked'
          >Ranked</label>
          <input
              name='skillsFilter'
              id='unranked'
              className={`input checkboxInput skillsFilterCheckboxInput`}
              type='checkbox'
              value='unranked'
              checked={skillsFilter.includes('unranked')}
              onChange={updateSkillsFilter}
          />
          <label 
              className={`checkboxLabel skillFilterCheckboxLabel`}
              htmlFor='unranked'
          >Unranked</label>
          <input
              name='skillsFilter'
              id='career'
              className={`input checkboxInput skillsFilterCheckboxInput`}
              type='checkbox'
              value='career'
              checked={skillsFilter.includes('career')}
              onChange={updateSkillsFilter}
          />
          <label 
              className={`checkboxLabel skillFilterCheckboxLabel`}
              htmlFor='career'
          >Career</label>
          <input
              name='skillsFilter'
              id='non-career'
              className={`input checkboxInput skillsFilterCheckboxInput`}
              type='checkbox'
              value='non-career'
              checked={skillsFilter.includes('non-career')}
              onChange={updateSkillsFilter}
          />
          <label 
              className={`checkboxLabel skillFilterCheckboxLabel`}
              htmlFor='non-career'
          >Non-Career</label>
        </div>

        <div className='skills'>
          <h2>General</h2>
          {character.skills?.general?.map(skill => {
            if(s)
            return (
              <p className='skill'>{skill}</p>
            )
          })}
        </div>
      
      </div>

      <div className='characterRight'>

        <Divider label='Attributes' collapseSection={collapseSection} />

        <div className='characterSection' id='Attributes'>
          <div className='characteristics'>
            <div  className='characteristic brawn'>
              <p className='rank'>{ character.brawn }</p>
              <p className='label'>Brawn</p>
            </div>
            <div  className='characteristic agility'>
              <p className='rank'>{ character.agility }</p>
              <p className='label'>Agility</p>
            </div>
            <div  className='characteristic intellect'>
              <p className='rank'>{ character.intellect }</p>
              <p className='label'>Intellect</p>
            </div>
            <div  className='characteristic cunning'>
              <p className='rank'>{ character.cunning }</p>
              <p className='label'>Cunning</p>
            </div>
            <div  className='characteristic willpower'>
              <p className='rank'>{ character.willpower }</p>
              <p className='label'>Willpower</p>
            </div>
            <div  className='characteristic presence'>
              <p className='rank'>{ character.presence }</p>
              <p className='label'>Presence</p>
            </div>
          </div>

          <div className='derivedAttributes'>

            <div className='attributeContainer'>
              <p className='attributeLabel'>Soak</p>
              <div className='values'>
                <div className='current'>
                  <p className='value'>{character.soakThreshold}</p>
                  <p className='sublabel'>Current</p>
                </div>
              </div>
            </div>

            <div className='attributeContainer'>
              <p className='attributeLabel'>Wounds</p>
              <div className='values'>
                <div className='threshold'>
                  <p className='value'>{character.woundsThreshold}</p>
                  <p className='sublabel'>Threshold</p>
                </div>
                <div className='current'>
                  <p className='value'>{character.woundsCurrent}</p>
                  <p className='sublabel'>Current</p>
                </div>
              </div>
            </div>

            <div className='attributeContainer'>
              <p className='attributeLabel'>Strain</p>
              <div className='values'>
                <div className='threshold'>
                  <p className='value'>{character.strainThreshold}</p>
                  <p className='sublabel'>Threshold</p>
                </div>
                <div className='current'>
                  <p className='value'>{character.strainCurrent}</p>
                  <p className='sublabel'>Current</p>
                </div>
              </div>
            </div>

            <div className='attributeContainer'>
              <p className='attributeLabel'>Defense</p>
              <div className='values'>
                <div className='ranged'>
                  <p className='value'>{character.defenseRanged}</p>
                  <p className='sublabel'>Ranged</p>
                </div>
                <div className='melee'>
                  <p className='value'>{character.defenseMelee}</p>
                  <p className='sublabel'>Melee</p>
                </div>
              </div>
            </div>

            <div className='attributeContainer'>
              <p className='attributeLabel'>Force Rating</p>
              <div className='values'>
                <div className='threshold'>
                  <p className='value'>{character.forceRating}</p>
                  <p className='sublabel'>Rating</p>
                </div>
                <div className='current'>
                  <p className='value'>{character.forceCommitted}</p>
                  <p className='sublabel'>Committed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
  );
}

// // MAY NEED TO CHANGE THIS TO A CLASS BASED COMPONENT.
// // WE WILL DEFINITELY NEED HELPER FUNCTIONS TO LOOP THROUGH AND DISPLAY DIFFERENT ASPECTS LIKE SKILLS AND TALENTS
// // I NEED TO RESEARCH HOW TO RETURN CHUNKS OF JSX WITH A STANDARD FUNCTION AND PLUG IT INTO OTHER SECTIONS

// import React from "react";
// import iterateObject from "../../helpers/characters/iterateObject";
// import CharacterSkill from "./CharacterSkill";
// import { useParams } from "react-router-dom";

// class Character extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             character: props.character,
//             skill: '',
//             currentRank: 0,
//             direction: '',
//             skillList: [],
//             generalSkills: [],
//             combatSkills: [],
//             knowledgeSkills: [],
//             image: require('../../assets/images/' + props.character.id + '-headshot.jpeg')
//         }
//         this.collapseElement = this.collapseElement.bind(this);
//     }

//     //Gets array of objects within the provided ojbect
//     //i.e. provided props.character.skills, returned array of child objects
//     collapseElement(event) {
//         const elem = document.getElementById(event.target.innerText.toLowerCase());
//         if(elem.style.display === 'none') {
//             elem.style.display = 'flex';
//         } else {
//             elem.style.display = 'none';
//         }
//     }

//     componentDidMount() {
//         this.setState({
//             skillList: iterateObject(this.props.character.skills).filter((skill) => (skill.rank > 0 || skill.career === true))
//         });
//     }

//     render () {

//         return(
//             <div className='characterContainer'>

//                 <div className='characterDetails'>

//                     <div className='characterOverview'>

//                         <div className='characterImageContainer'>
//                             <img className='characterImage' src={this.state.image} alt='' />
//                         </div>

//                         <div className='characterTitle'>
//                             <div className='characterName'>
//                                 <h1>{this.state.character.displayName}</h1>
//                                 <p className='sw'>{this.state.character.displayName}</p>
//                             </div>
//                             <h2 className="characterSpecies">
//                                 <span className='label'>Species: </span>
//                                 {this.state.character.background.species}
//                             </h2>
//                             <h2 className="characterCareer">
//                                 <span className='label'>Career: </span>
//                                 {this.state.character.career.name}
//                             </h2>
//                             <h3 className="characterSpecializations">
//                                 <p className='label'>Specializations: </p>
//                                 {iterateObject(this.state.character.career.specializations).map(
//                                     (spec) => <p key={spec.name}>{spec.name}</p>
//                                 )}
//                             </h3>
//                         </div>

//                         <div className='characterImageContainer'>
//                             <img className='characterImage' src={this.state.image} alt='' />
//                         </div>

//                     </div>
//                     <div className="divider">
//                         <hr className="dividerLine"></hr>
//                         <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Attributes</p>
//                         <hr className="dividerLine"></hr>
//                     </div>
//                     <div className='characterAttributes'>
//                         <div className='derived' id="attributes">
//                             <div className="attributeContainer soak">
//                                 <div className="label">Soak</div>
//                                 <div className="values">
//                                     <div className='current'>
//                                         <p className='value'>{this.props.character.attributes.soak}</p>
//                                         <div className="sublabel">Current</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="attributeContainer wounds">
//                                 <div className="label">Wounds</div>
//                                 <div className="values">
//                                     <div className='threshold'>
//                                         <p className='value'>{this.props.character.attributes.woundThreshold}</p>
//                                         <div className="sublabel">Threshold</div>
//                                     </div>
//                                     <div className='current'>
//                                         <p className='value'>{this.props.character.attributes.wounds}</p>
//                                         <div className="sublabel">Current</div>
//                                     </div>
//                                 </div>

//                             </div>

//                             <div className="attributeContainer strain">
//                                 <div className="label">Strain</div>
//                                 <div className="values">
//                                     <div className='threshold'>
//                                         <p className='value'>{this.props.character.attributes.strainThreshold}</p>
//                                         <div className="sublabel">Threshold</div>
//                                     </div>
//                                     <div className='current'>
//                                         <p className='value'>{this.props.character.attributes.strain}</p>
//                                         <div className="sublabel">Current</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="attributeContainer defense">
//                                 <div className="label">Defense</div>
//                                 <div className="values">
//                                     <div className='threshold'>
//                                         <p className='value'>{this.props.character.attributes.rangedDefense}</p>
//                                         <div className="sublabel">Ranged</div>
//                                     </div>
//                                     <div className='current'>
//                                         <p className='value'>{this.props.character.attributes.meleeDefense}</p>
//                                         <div className="sublabel">Melee</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="attributeContainer forceRating">
//                                 <div className="label">Force Rating</div>
//                                 <div className="values">
//                                     <div className='current'>
//                                         <p className='value'>{this.props.character.attributes.forceRating}</p>
//                                         <div className="sublabel">Current</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="divider">
//                             <hr className="dividerLine"></hr>
//                             <p className="dividerLabel"  onClick={(e) => this.collapseElement(e)}>Characteristics</p>
//                             <hr className="dividerLine"></hr>
//                         </div>

//                         <div className='characteristics' id='characteristics'>

//                             <div  className='characteristic brawn'>
//                                 <p className='rank'>{this.props.character.characteristics.brawn }</p>
//                                 <p className='label'>Brawn</p>
//                             </div>

//                             <div  className='characteristic agility'>
//                                 <p className='rank'>{this.props.character.characteristics.agility }</p>
//                                 <p className='label'>Agility</p>
//                             </div>

//                             <div  className='characteristic intellect'>
//                                 <p className='rank'>{this.props.character.characteristics.intellect }</p>
//                                 <p className='label'>Intellect</p>
//                             </div>

//                             <div  className='characteristic cunning'>
//                                 <p className='rank'>{this.props.character.characteristics.cunning }</p>
//                                 <p className='label'>Cunning</p>
//                             </div>

//                             <div  className='characteristic willpower'>
//                                 <p className='rank'>{this.props.character.characteristics.willpower }</p>
//                                 <p className='label'>Willpower</p>
//                             </div>

//                             <div  className='characteristic presence'>
//                                 <p className='rank'>{this.props.character.characteristics.presence }</p>
//                                 <p className='label'>Presence</p>
//                             </div>

//                         </div>
//                     </div>

//                     <div className="divider">
//                         <hr className="dividerLine"></hr>
//                         <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Skills</p>
//                         <hr className="dividerLine"></hr>
//                     </div>
//                     <div className='characterSkills' id='skills'>
//                         {/*map over array and return list of skills and their ranks.*/}
//                         <div className='skillsRow'>
//                             <div className="divider">
//                                 <hr className="dividerLine"></hr>
//                                 <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>General</p>
//                                 <hr className="dividerLine"></hr>
//                             </div>
//                             <div className='generalSkills'  id='general'>

//                                 {this.state.skillList.filter(skill => skill.category === "General").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

//                             </div>
//                         </div>

//                         <div className='skillsRow'>
//                             <div className="divider">
//                                 <hr className="dividerLine"></hr>
//                                 <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Combat</p>
//                                 <hr className="dividerLine"></hr>
//                             </div>
//                             <div className='combatSkills' id='combat'>

//                                 {this.state.skillList.filter(skill => skill.category === "Combat").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

//                             </div>

//                             <div className="divider">
//                                 <hr className="dividerLine"></hr>
//                                 <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Knowledge</p>
//                                 <hr className="dividerLine"></hr>
//                             </div>

//                             <div className='knowledgeSkills' id='knowledge'>

//                                 {this.state.skillList.filter(skill => skill.category === "Knowledge").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="divider">
//                     <hr className="dividerLine"></hr>
//                     <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Talents</p>
//                     <hr className="dividerLine"></hr>
//                 </div>
//                 <div className='character-talents' id='talentsß'>
//                     {/* WE NEED TO FIGURE OUT HOW TO LOOP THROUGH props.character.talents */}
//                 </div>
//             </div>
//         )
//     }
// }

// export default Character;
