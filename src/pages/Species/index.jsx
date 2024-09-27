import './styles.scss';

import { fetchAllSpecies } from "../../services/species";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';

export default function Species() {
  const {data: species, loading} = useFetchData(fetchAllSpecies);

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  if(loading) return <Loading />

  return (
    <section className='Species'>
      <h1>Galactic Species Database</h1>
      <div className='species-list'>
        {species.map(spec => <p key={spec.id}><a href={`/planets/${spec.id}`}>{spec.displayName}</a></p>)}
      </div>
      <hr style={{"borderTop": "3px solid #fff"}} />
      <h2>Species</h2>
      <ul>
        <h3>Primary</h3>
        <li>{checkbox} Alphabetical list of all species</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} alphabetical separator or scroll bar</li>
        <li>{uncheckbox} Filter options for species</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Species [Singluar]</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Image</li>
        <li>{uncheckbox} Known Members</li>
        <li>{uncheckbox} Home Planet</li>
        <li>{uncheckbox} Build Information from SWRPG Books</li>
        <li>{uncheckbox} encountered?</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Description from SWRPG Books</li>
      </ul>
    </section>
  )
}