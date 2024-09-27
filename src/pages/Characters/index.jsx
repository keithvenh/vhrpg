import './styles.scss';

import Loading from '../../features/Loading';
import PCBar from './PCBar';

import useFetchData from '../../hooks/useFetchData';
import {fetchCharacters} from '../../services/characters/fetchCharacters';

export default function Characters() {

  const {data: characters, loading} = useFetchData(fetchCharacters)

  function capitalCase(word) {
    word = word.charAt(0).toUpperCase() + word.slice(1)
    return word;
  }

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  const charIcons = {
    "pc": <i className='fas fa-dice-d20'></i>,
    "nemesis": <i className='fas fa-chess-queen'></i>,
    "rival": <i className='fas fa-chess-bishop'></i>,
    "minion": <i className='fas fa-chess-pawn'></i>
  }

  if(loading) return <Loading />

  return (
    <section className='Characters'>
      <PCBar chars={characters} />

      <h1 className='section-title'>List of Galactic Denizens</h1>

      <div className='character-list'>
        {characters.map(char => <p key={char.id} className='character-link'><a href={`/characters/${char.id}`}>{charIcons[char.type]} {char.displayName} [{capitalCase(char.type)}]</a></p>)}
      </div>

      <hr style={{"borderTop": "3px solid #fafafa"}} />
      <h1>To-Do</h1>
      <h2>Characters</h2>
      <ul>
        <h3>Primary</h3>
        <li>{checkbox} Scrollable list of PCs with images, status bar</li>
        <li>{checkbox} Alphabetical list of all characters</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Alphabetical separators or scroll bar</li>
        <li>{uncheckbox} Filter options for characters</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Character</h2>
      <ul>
        <h3>Primary</h3>
        <li>{checkbox} Wounds</li>
        <li>{checkbox} Strain</li>
        <li>{checkbox} Name</li>
        <li>{checkbox} Species</li>
        <li>{checkbox} Current Location</li>
        <li>{checkbox} isContact?</li>
        <li>{checkbox} Type [PC, Nemesis, Rival, Minion] (as skill level)</li>
        <li>{checkbox} Credits</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Force Rating</li>
        <li>{uncheckbox} Morality | Conflict</li>
        <li>{uncheckbox} Obligation [Triggered]</li>
        <li>{uncheckbox} Skills</li>
        <li>{uncheckbox} Talents</li>
        <li>{uncheckbox} Force Powers</li>
        <li>{uncheckbox} Gear</li>
        <li>{uncheckbox} Faction Esteem</li>
        <li>{checkbox}Known Associates</li>
      </ul>
    </section>
  )
}