import './styles.scss';

import { fetchPlanet } from "../../services/planets";
import { useParams } from 'react-router-dom';

export default function PlanetShowPage() {

  const {id} = useParams();
  const planet = fetchPlanet(id);

  return (
    <section className='PlanetShowPage'>
      <h1>Astronomical Object Profile:</h1>
      <p className='sw id'>{planet.id}</p>
      <div className='basic-info'>
        <div className='planet-image'>
          {planet.imageURL ? <img src={planet.imageURL} /> : <i className='fas fa-globe'></i>}
        </div>
        <div className='info'>
          <h2>Name: {planet.name}</h2>
          <div className='data'>
            <p>Region: {planet.region || "Unknown"}</p>
            <p>Sector: {planet.sector|| "Unknown"}</p>
            <p>System: {planet.system || "Unknown"}</p>
            <p>Grid Square: {planet.gridSquare || "Unknown"}</p>
            <p>Visited: {planet.visited ? "Affirmative" : "Negative"}</p>
          </div>
        </div>
      </div>
      <div className='description'>
        <h3>Description</h3>
        <p>{planet.description || "None Available"}</p>
      </div>
    </section>
  )
}