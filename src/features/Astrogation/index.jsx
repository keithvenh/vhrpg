import './styles.scss';

import {useState} from 'react';

import {vorzydSectorPlanets} from '../../db/vorzydSectorPlanetList';

import getRoutes from '../../services/astrogation/getRoutes';

import RouteTable from './RouteTable';

export default function Astrogation() {

  const [fromPlanet, setFromPlanet] = useState();
  const [toPlanet, setToPlanet] = useState();
  const [routes, setRoutes] = useState()

  const mapImage = require('../../app/assets/images/Sw-Grid-R6-Map-Transparent.png')

  function handleChange(e) {
    if(e.target.name == 'fromPlanet'){
      setFromPlanet(e.target.value);
    }
    if(e.target.name == 'toPlanet') {
      setToPlanet(e.target.value);
    }
  }

  function submitAstrogation() {
    let routes = getRoutes({fromPlanet, toPlanet})

    routes = routes.sort((a,b) => {
      if (a.time < b.time) {return -1}
      else if (a.time > b.time) {return 1}
      else if (a.connections < b.connections) {return -1}
      else if (a.connections > b.connections) {return 1}
      return 0
    })

    setRoutes(routes)
  }
  
  return (
    <section className='Astrogation'>
      <h1>Astrogation</h1>
      <div className='astrogation-content'>
        <div className='map-image'>
          <img src={mapImage} />
        </div>
        <div className='astrogation-check'>
          <div className='astrogation-form'>
            <p className='label'>Departing Planet</p>
            <select name='fromPlanet' value={fromPlanet} onChange={handleChange}>
                <option value=''>
                  SELECT ONE
                </option>
              {vorzydSectorPlanets.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <p className='label'>Departing Planet</p>
            <select name='toPlanet' value={toPlanet} onChange={handleChange}>
                <option value=''>
                  SELECT ONE
                </option>
              {vorzydSectorPlanets.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <button onClick={submitAstrogation}>Submit</button>
          </div>

          <div className='astrogation-results'>
            {routes ? <RouteTable routes={routes.slice(0,5)} /> : ''}
          </div>

        </div>

      </div>
    </section>
  )
}