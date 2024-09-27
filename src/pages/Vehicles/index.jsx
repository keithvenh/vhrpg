import './styles.scss';

import { fetchAllVehicles } from "../../services/vehicles";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';

export default function Vehicles() {
  const {data: vehicles, loading} = useFetchData(fetchAllVehicles);

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  if(loading) return <Loading />

  return (
    <section className='Vehicles'>
      <h1>Starships and Other Vehicles</h1>
      <div className='vehicles-list'>
        {vehicles.map(vehicle => <p key={vehicle.id}><a href={`/planets/${vehicle.id}`}>{vehicle.displayName}</a></p>)}
      </div>
      <hr style={{"borderTop": "3px solid #fff"}} />
      <h2>Vehicles</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Scrollable list of PC Vehicles with images, status bar</li>
        <li>{checkbox} Alphabetical list of all vehicles</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Alphabet spearators or sroll bar</li>
        <li>{uncheckbox} Filter options for vehicles [class, enc]</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Vehicle</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Wounds</li>
        <li>{uncheckbox} Strain</li>
        <li>{uncheckbox} Armor</li>
        <li>{uncheckbox} Type</li>
        <li>{uncheckbox} Current Location</li>
        <li>{uncheckbox} Silhouette</li>
        <li>{uncheckbox} Consumables</li>
        <li>{uncheckbox} Fuel</li>
        <li>{uncheckbox} Encumbrance</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Weapons</li>
        <li>{uncheckbox} Other standar SWRPG vehicle information</li>
      </ul>
    </section>
  )
}