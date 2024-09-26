import './styles.scss';

import {useState, useEffect} from 'react';
import {fetchCharacters} from '../../services/characters/fetchCharacters';

import Loading from '../../features/Loading';
import PCBox from './PCBox';

export default function Characters() {

  const [characters, setCharacters] = useState();

  const fetchData = async () => {
    const chars = await fetchCharacters();
    setCharacters(chars);
  };
  
  useEffect(() => {
    fetchData();
  }, [])


  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  if(!characters) {return <Loading />}

  return (
    <section className='Characters'>
      <div className='pc-bar'>
        {characters.map(char => {
          if(char.type == 'pc') {
            return (
              <PCBox key={char.id} pc={char} />
            )
          }
        })}
      </div>
      <h1>Characters</h1>
      <ul>
        <li>{uncheckbox} Scrollable list of PCs with images, status bar</li>
        <li>{uncheckbox} Alphabetical list of all characters with separators</li>
        <li>{uncheckbox} Filter options for characters</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Character</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Wounds</li>
        <li>{uncheckbox} Strain</li>
        <li>{uncheckbox} Credits</li>
        <li>{uncheckbox} Obligation [Triggered]</li>
        <li>{uncheckbox} Current Location</li>
        <li>{uncheckbox} Force Rating</li>
        <li>{uncheckbox} Morality | Conflict</li>
        <li>{uncheckbox} Type [PC, Nemesis, Rival, Minion]</li>
        <li>{uncheckbox} isContact?</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Skills</li>
        <li>{uncheckbox} Talents</li>
        <li>{uncheckbox} Force Powers</li>
        <li>{uncheckbox} Gear</li>
        <li>{uncheckbox} Faction Esteem</li>
      </ul>
    </section>
  )
}