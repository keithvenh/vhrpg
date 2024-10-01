import './styles.scss';

import { fetchAllSpecies } from "../../services/species";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';
import AlphabetizeWithLink from '../../components/Alphabetize';

export default function Species() {
  const {data: species, loading} = useFetchData(fetchAllSpecies);

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  if(loading) return <Loading />

  return (
    <section className='Species'>
      <h1>Galactic Species Database</h1>
      <div className='species-list'>
        <AlphabetizeWithLink data={species} sortField='displayName' linkPrefix='/species/' linkField='id' />
      </div>
    </section>
  )
}