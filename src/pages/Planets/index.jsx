import './styles.scss';

import { fetchAllPlanets } from "../../services/planets";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';
import AlphabetizeWithLink from '../../components/Alphabetize';

export default function Planets() {
  const {data: planets, loading} = useFetchData(fetchAllPlanets);

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  if(loading) return <Loading />

  return (
    <section className='Planets'>
      <h1>Star Systems</h1>
      <div className='planets-list'>
        <AlphabetizeWithLink data={planets} sortField='displayName' linkPrefix='/planets/' linkField='id' />
      </div>
    </section>
  )
}