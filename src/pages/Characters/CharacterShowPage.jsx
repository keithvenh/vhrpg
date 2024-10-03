import {useParams} from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import {getDoc, doc} from 'firebase/firestore';
import {charactersCollection} from '../../db/application/db';
import {useNavigate} from 'react-router-dom'

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
  const {data: character, loading} = useFetchData(() => getCharacter(id))

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

  
  if(!character) return <Loading />
  
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
            <p>Vorzyd Contact List: {character.isContact ? "Affirmative" : "Negative"}</p>
            <p>Skill Level: {skillLevels[character.type] || "Unknown"}</p>
            <p>Wealth: {character.credits || "Unknown"}</p>
          </div>
        </div>
      </div>
      <div className='status'>
        <p className='strain'>{strain} {character.strainThreshold - character.strainCurrent || ""}|{character.strainThreshold}</p>
        <p className='wounds'>{wounds} {character.woundsThreshold - character.woundsCurrent || ""}|{character.woundsThreshold}</p>
      </div>
      <div className='associates'>
        <h3>Known Associates</h3>
        <p>{emptyBox(0)} {character.knownAssociates || "None Known"}</p>
      </div>
    </section>
  )
}