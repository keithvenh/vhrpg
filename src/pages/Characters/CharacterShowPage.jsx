import {useParams, useNavigate} from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import {getDoc, doc} from 'firebase/firestore';
import {charactersCollection} from '../../db/application/db';
import {useState, useEffect} from 'react';
import SkillTrack from './SkillTrack';
import CharacterHud from './CharacterHud';

import Loading from '../../features/Loading';

export default function Character() {
  const navigate = useNavigate();

  async function getCharacter(characterID) {
    const c = await getDoc(doc(charactersCollection, characterID));
    return {
      ...c.data(),
      id: c.id,
    };
  }
  const {id} = useParams();
  const {data: char, loading} = useFetchData(() => getCharacter(id));
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (!loading && char) {
      setCharacter(char)
    }
  }, [loading, char])
  
  if(!character) return <Loading />

  const skillLevels = {
    "pc": "Aurek",
    "nemesis": "Besh",
    "rival": "Cresh",
    "minion": "Dorn"
  }

  const handleEditClick = () => navigate(`/characters/${character.id}/edit`, {state: { character }})
  
  const emptyBox = (i) => {
    return <i key={i} className='fa-regular fa-square-full'></i>
  }
  const fullBox = (i) => {
    return <i key={i} className='fa-solid fa-square-full'></i>
  }

  const strain = []
  const wounds = []

  function handleWoundsStrain(type, amount) {
    const max = parseInt(character[`${type}Threshold`]) + 1
    let current = parseInt(character[`${type}Current`]) + amount
    current = Math.min(Math.max(current, 0), max);

    console.log(current);
    setCharacter(prevState => ({
      ...prevState,
      [`${type}Current`]: current
    }))

  }

  const circleCheck = <i className='fas fa-circle-check'></i>
  const circle = <i className='fa-regular fa-circle'></i>

  
  
  for(let i = 0; i < character.woundsThreshold; i++) {
    let health = character.woundsThreshold - character.woundsCurrent;
    if(health > i) {
      wounds.push(fullBox(i))
    }
    else {wounds.push(emptyBox(i))}
  }

  for(let i = 0; i < character.strainThreshold; i++) {
    let health = character.strainThreshold - character.strainCurrent;
    if(health > i) {
      strain.push(fullBox(i))
    }
    else {strain.push(emptyBox(i))}
  }
  
  return (
    <section className='CharacterShowPage'>
      <h1>Galactic Denizen Profile:</h1>
      <i className='fas fa-pencil edit-character-button' onClick={handleEditClick}></i>
      <p className='sw id'>{id}</p>
      <div className='basic-info'>
        <div className='character-image'>
          {character.imageURL ? <img src={character.imageURL} /> : <i className='fas fa-user'></i>}
        </div>
        <div className='info'>
          <h2>Name: {character.displayName}</h2>
          <div className='data'>
            <p>Species: {character.species || "Unknown"}</p>
            <p>Last Known Location: {character.location || "Unknown"}</p>
            <p>The Commonality Contact List: {character.isContact ? "Affirmative" : "Negative"}</p>
            <p>Career: {character.career?.name || 'Unknown'}</p>
            <p> Specializations: {character.specializations?.map(spec => {
              return (<a href={`/characters/${character.id}/specializations/${spec.id}`}>{spec.name}</a>)
            })}</p>
            <p> Force Powers: {character.forcePowers?.map(fp => {
              return (<a href={`/characters/${character.id}/force_powers/${fp.id}`}>{fp.name}</a>)
            })}</p>
          </div>
        </div>
        <div className='attributes'>
          <div className='attribute soak'>
            <p className='label'>Soak</p>
            <p className='value'>{character.soak}</p>
            <p className='sublabel current'>Current</p>
          </div>
          <div className='attribute'>
            <p className='label'>Wounds</p>
            <p className='value threshold'>{character.woundsThreshold}</p>
            <p className='value'>{character.woundsCurrent}</p>
            <p className='sublabel threshold'>Threshold</p>
            <p className='sublabel current'>Current</p>
          </div>
          <div className='attribute'>
            <p className='label'>Strain</p>
            <p className='value'>{character.strainThreshold}</p>
            <p className='value'>{character.strainCurrent}</p>
            <p className='sublabel threshold'>Threshold</p>
            <p className='sublabel current'>Current</p>
          </div>
          <div className='attribute'>
            <p className='label'>Defense</p>
            <p className='value'>{character.defenseRanged || '-'}</p>
            <p className='value'>{character.defenseMelee || '-'}</p>
            <p className='sublabel threshold'>Ranged</p>
            <p className='sublabel current'>Melee</p>
          </div>
          <div className='attribute'>
            <p className='label'>Force</p>
            <p className='value threshold'>{character.forceRating}</p>
            <p className='value'>{character.forceCommitted}</p>
            <p className='sublabel threshold'>Rating</p>
            <p className='sublabel current'>Committed</p>
          </div>
          <div className='attribute'>
            <p className='label'>Encumbrance</p>
            <p className='value'>{character.encumbranceThreshold || '-'}</p>
            <p className='value'>{character.encumbranceCurrent || '-'}</p>
            <p className='sublabel threshold'>Threshold</p>
            <p className='sublabel current'>Current</p>
          </div>
          <div className='attribute'>
            <p className='label'>Experience</p>
            <p className='value threshold'>{character.xpAvailable}</p>
            <p className='value current'>{character.xpSpent}</p>
            <p className='sublabel threshold'>Available</p>
            <p className='sublabel current'>Spent</p>
          </div>
          <div className='attribute'>
            <p className='label'>Credits</p>
            <p className='value threshold'>{character.creditsAvailable}</p>
            <p className='value current'>{character.creditsSpent}</p>
            <p className='sublabel threshold'>Available</p>
            <p className='sublabel current'>Spent</p>
          </div>
        </div>
      </div>
      <div className='skills'>
        <h2>Skills</h2>
        <div className='characteristics'>
          <div className='characteristic'>
            <p className='value'>{character.brawn}</p>
            <p className='label'>Brawn</p>
          </div>
          <div className='characteristic'>
            <p className='value'>{character.agility}</p>
            <p className='label'>Agility</p>
          </div>
          <div className='characteristic'>
            <p className='value'>{character.intellect}</p>
            <p className='label'>Intellect</p>
          </div>
          <div className='characteristic'>
            <p className='value'>{character.cunning}</p>
            <p className='label'>Cunning</p>
          </div>
          <div className='characteristic'>
            <p className='value'>{character.willpower}</p>
            <p className='label'>Willpower</p>
          </div>
          <div className='characteristic'>
            <p className='value'>{character.presence}</p>
            <p className='label'>Presence</p>
          </div>
        </div>
        <div className='category'>
          <h3>General Skills</h3>
          <div>
            {Object.entries(character.skills)
            .filter(([key,skill]) => skill.category === 'general')
            .sort(([a],[b]) => a.localeCompare(b))
            .map(([key, skill]) => (
              <div className='skill'>
                <div>
                  {skill.isCareer ? circleCheck : circle}
                  {skill.name}
                </div>
                <SkillTrack rank={parseInt(skill.rank)} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className='category'>
            <h3>Combat Skills</h3>
            <div>
              {Object.entries(character.skills)
              .filter(([key,skill]) => skill.category === 'combat')
              .sort(([a],[b]) => a.localeCompare(b))
              .map(([key, skill]) => (
                <div className='skill'>
                  <div>
                    {skill.isCareer ? circleCheck : circle}
                    {skill.name}
                  </div>
                  <SkillTrack rank={parseInt(skill.rank)} />
                </div>
              ))}
            </div>
          </div>
          <div className='category'>
            <h3>Knowledge Skills</h3>
            <div>
              {Object.entries(character.skills)
              .filter(([key,skill]) => skill.category === 'knowledge')
              .sort(([a],[b]) => a.localeCompare(b))
              .map(([key, skill]) => (
                <div className='skill'>
                  <div>
                    {skill.isCareer ? circleCheck : circle}
                    {skill.name}
                  </div>
                  <SkillTrack rank={parseInt(skill.rank)} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='talents'>
          <h2>Talents</h2>
        </div>
      </div>
        <h3>Known Associates</h3>
        <p>{emptyBox(0)} {character.knownAssociates || "None Known"}</p>
    </section>
  )
}