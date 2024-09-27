import './styles.scss';

import { fetchAllOrganizations } from "../../services/organizations";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';

export default function Organizations() {
  const {data: organizations, loading} = useFetchData(fetchAllOrganizations);

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  if(loading) return <Loading />

  return (
    <section className='Organizations'>
      <h1>Galactic Organizations, Factions, Guilds and Groups</h1>
      <div className='organizations-list'>
        {organizations.map(org => <p key={org.id}><a href={`/planets/${org.id}`}>{org.displayName}</a></p>)}
      </div>
      <hr style={{"borderTop": "3px solid #fff"}} />
      <h2>Organizations</h2>
      <ul>
        <h3>Primary</h3>
        <li>{checkbox} Alphabetical list of all organizations</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Highlight orgs we are part of</li>
        <li>{uncheckbox} Alphabet separator or scroll list</li>
      </ul>
      <hr />
      <h2>Factions</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Logo</li>
        <li>{uncheckbox} Description</li>
        <li>{uncheckbox} Jobs</li>
        <li>{uncheckbox} Bonuses</li>
        <li>{uncheckbox} Rewards</li>
        <li>{uncheckbox} Known Members</li>
        <li>{uncheckbox} Headquarters Location</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Current PC Esteem</li>
        <li>{uncheckbox} All PC Esteem</li>
      </ul>
    </section>
  )
}