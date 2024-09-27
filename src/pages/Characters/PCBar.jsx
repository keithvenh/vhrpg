import './styles.scss';
import useFetchData from '../../hooks/useFetchData';
import {fetchCharacters} from '../../services/characters/fetchCharacters';
import { useContext } from 'react';
import {UserContext} from '../../app/contexts/userContext';

import PCBox from './PCBox';
import Loading from '../../features/Loading';

export default function PCBar({chars}) {

  const {user} = useContext(UserContext);
  const {data: characters, loading} = useFetchData(fetchCharacters);

  if(loading) return <Loading />

  let pcs = characters.filter(char => char.type == 'pc');
  pcs = pcs.sort((a, b) => user.profile.settings[a.id] - user.profile.settings[b.id])

  return (
    <div className='pc-bar'>
      {pcs.map(char => <PCBox key={char.id} pc={char} />)}
    </div>
  )
}