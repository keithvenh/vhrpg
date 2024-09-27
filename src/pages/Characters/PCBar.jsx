import './styles.scss';
import {useState, useEffect} from 'react';
import {fetchCharacters} from '../../services/characters/fetchCharacters';

import PCBox from './PCBox';
import Loading from '../../features/Loading';

export default function PCBar() {

  const [characters, setCharacters] = useState();

  console.log('in PCBar', characters)

  const fetchData = async () => {
    const chars = await fetchCharacters();
    console.log(chars);
    setCharacters(chars);
  };
  
  useEffect(() => {
    fetchData();
  }, [])

  if(!characters) {return <Loading />}

  return (
    <div className='pc-bar'>
      {characters.map(char => {
        if(char.type == 'pc') {
          return (
            <PCBox key={char.id} pc={char} />
          )
        }
      })}
    </div>
  )
}