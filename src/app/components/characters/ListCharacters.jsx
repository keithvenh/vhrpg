import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import { fetchCharacters } from '../../helpers/characters/fetchCharacters';
import FilterCharactersButtons from './FilterCharactersButtons';

function ListCharacters() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [initializing, setInitializing] = useState(true);
  const [filter, setFilter] = useState('all');

  const navigate = useNavigate();

  const changeFilter = (newFilter) => {
    setFilter(newFilter);

    if(newFilter === 'all') {
      setFilteredCharacters(characters);
      return;
    }
    if(newFilter === 'npc') {
      const npcs = characters.filter(character => ['nemesis', 'rival', 'minion'].includes(character.type))
      setFilteredCharacters(npcs)
      return;
    }
    if(newFilter === 'create') {
      navigate('/characters/new');
    }
    const chars = characters.filter(character => character.type === newFilter)
    setFilteredCharacters(chars);

  }

  const fetchData = async () => {
    const chars = await fetchCharacters();
    setCharacters(chars);
    setFilteredCharacters(chars);
    setInitializing(false);
  };
  
  useEffect(() => {
    fetchData();
  }, [])
  
  if(initializing) {
    return <Loading />
  }

  let displayLetter = ""

  // Returns a Segmentor if one doesn't exist
  const checkLetter = (charName) => {
    // If the first letter is a number, resturn under # header
    if(!isNaN(Number(charName[0]))) {
      // If the displayLetter isn't already a number
      if(!displayLetter === '#') {
        // set the display letter
        displayLetter = '#';
        // return the segmentor
        return <p className='sw segmentor'>{displayLetter}</p>
      }
    }

    if(charName[0] !== displayLetter) {
      displayLetter = charName[0];
      return <p className='sw segmentor'>{displayLetter}</p>
    }
  }

  return (
    <div className='listCharacters'>
      <FilterCharactersButtons filter={filter} clickHandler={changeFilter}/>
      <div className='characterLinks'>
        {filteredCharacters.map(character => {

                return (
                    <React.Fragment key={character.id}>
                        {checkLetter(character.displayName)}
                        <p className="characterLink">
                            <Link to={`/characters/${character.id}`}>{character.displayName}</Link>
                        </p>
                    </React.Fragment>
                );
            })}
      </div>

    </div>
    // ...
  );
}

export default ListCharacters;
