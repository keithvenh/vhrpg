import './styles.scss';

import { fetchAllPlanets } from "../../services/planets";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';

export default function Planets() {
  const {data: planets, loading} = useFetchData(fetchAllPlanets);

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  if(loading) return <Loading />

  return (
    <section className='Planets'>
      <h1>Star Systems</h1>
      <div className='planets-list'>
        {planets.map(planet => <p key={planet.id}><a href={`/planets/${planet.id}`}>{planet.displayName}</a></p>)}
      </div>
      <hr style={{"borderTop": "3px solid #fff"}} />
      <h2>Planets</h2>
      <ul>
        <h3>Primary</h3>
        <li>{checkbox} Alphabetical list of all planets</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Scrollable list of common or favorited planets</li>
        <li>{uncheckbox} Alphabetical separators or scoll bar</li>
        <li>{uncheckbox} Filter options [visited, sector, rim, grid]</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Planet</h2>
      <ul>
        <h3>Primary</h3>
        <li>{checkbox} Name</li>
        <li>{checkbox} Image</li>
        <li>{checkbox} Description</li>
        <li>{checkbox} location data [region, sector, grid]</li>
        <li>{checkbox} visited?</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Other SWRPG Data</li>
        <li>{uncheckbox} Distance From Current Location</li>
        <li>{uncheckbox} Astrogation: plot course to</li>
        <li>{uncheckbox} Astrogation: plot course from</li>
      </ul>
    </section>
  )
}