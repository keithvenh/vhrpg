import './styles.scss';

import { fetchAllPlanets } from "../../services/planets";

import AlphabetizeWithLink from '../../components/Alphabetize';

export default function Planets() {
  const allPlanets = fetchAllPlanets()

  return (
    <section className='Planets'>
      <h1>Star Systems</h1>
      <div className='planets-list'>
        <AlphabetizeWithLink data={allPlanets} sortField='name' linkPrefix='/planets/' linkField='id' />
      </div>
    </section>
  )
}