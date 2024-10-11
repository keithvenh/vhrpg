import './styles.scss';

import {useState} from 'react';

import { fetchAllPlanets } from '../../services/planets';

import { ReactComponent as MapSVG } from '../../app/assets/images/TheCommonalityMap.svg'

import getRoutes from '../../services/astrogation/getRoutes';

import RouteTable from './RouteTable';

export default function Astrogation() {
  const planets = fetchAllPlanets();
  const [fromPlanet, setFromPlanet] = useState();
  const [toPlanet, setToPlanet] = useState();
  const [routes, setRoutes] = useState()
  const [style, setStyle] = useState({});

  const mapImage = require('../../app/assets/images/TheCommonalityMap.svg')

  function handleChange(e) {
    if(e.target.name == 'fromPlanet'){
      setFromPlanet(e.target.value);
      const planetNode = document.getElementById(e.target.value)
      console.log(planetNode);
      planetNode.style.fill = "white";
      planetNode.style.r = "32px";
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
          <MapSVG style={{style}}/>
        </div>
        <div className='astrogation-check'>
          <div className='astrogation-form'>
            <p className='label'>Departing Planet</p>
            <select name='fromPlanet' value={fromPlanet} onChange={handleChange}>
                <option value=''>
                  SELECT ONE
                </option>
              {planets.map((option, index) => (
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
              {planets.map((option, index) => (
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