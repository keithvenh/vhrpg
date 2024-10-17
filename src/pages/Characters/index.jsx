import './styles.scss';

import Loading from '../../features/Loading';
import AlphabetizeWithLink from '../../components/Alphabetize';
import PCBar from './PCBar';

import useFetchData from '../../hooks/useFetchData';
import {fetchAllCharacters} from '../../services/characters/index';

export default function Characters() {

  const {data: characters, loading} = useFetchData(fetchAllCharacters)

  if(loading) return <Loading />

  return (
    <section className='Characters'>
      <PCBar chars={characters} />

      <h1 className='section-title'>List of Galactic Denizens</h1>

      <div className='character-list'>
        <AlphabetizeWithLink data={characters} sortField='displayName' displayField='displayName' linkPrefix='/characters/' linkField='id' />
      </div>
    </section>
  )
}