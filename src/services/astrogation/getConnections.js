import {astroNav as connectionData} from '../../db/static/astroNav';
import {calculateTrip} from './calculateTrip';

export function getConnections(planet) {

  let connections = connectionData.filter(conn => conn.from_planet == planet);

  connections = connections.map(conn => {
    const calculations = calculateTrip(conn.time, conn.parsecs, conn.light_years, conn.hyperspace_type)
    return {
      fromPlanet: conn.from_planet,
      toPlanet: conn.to_planet,
      hyperspaceType: conn.hyperspace_type,
      ...calculations
    }
  })
  return connections
}

