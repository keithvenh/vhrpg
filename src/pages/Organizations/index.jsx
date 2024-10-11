import './styles.scss';

import { fetchAllOrganizations } from "../../services/organizations";

import Loading from '../../features/Loading';
import AlphabetizeWithLink from '../../components/Alphabetize';

export default function Organizations() {

  const allOrganizations = fetchAllOrganizations()

  return (
    <section className='Organizations'>
      <h1>Galactic Organizations, Factions, Guilds and Groups</h1>
      <div className='organizations-list'>
        <AlphabetizeWithLink data={allOrganizations} sortField='name' linkPrefix='/organizations/' linkField='id' />
      </div>
    </section>
  )
}