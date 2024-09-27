import './styles.scss';
import useFetchData from '../../hooks/useFetchData';
import {fetchCharacters} from '../../services/characters/fetchCharacters';

import PCBox from './PCBox';
import Loading from '../../features/Loading';

export default function PCBar({chars}) {

  const {data: characters, loading} = useFetchData(fetchCharacters);

  if(loading) return <Loading />

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