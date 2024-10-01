import './styles.scss';

import { fetchAllOrganizations } from "../../services/organizations";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';
import AlphabetizeWithLink from '../../components/Alphabetize';

export default function Organizations() {
  const {data: organizations, loading} = useFetchData(fetchAllOrganizations);

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  if(loading) return <Loading />

  return (
    <section className='Organizations'>
      <h1>Galactic Organizations, Factions, Guilds and Groups</h1>
      <div className='organizations-list'>
        <AlphabetizeWithLink data={organizations} sortField='displayName' linkPrefix='/organizations/' linkField='id' />
      </div>
    </section>
  )
}