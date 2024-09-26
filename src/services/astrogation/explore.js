import {getConnections} from './getConnections';
import {gradeSegment} from './gradeAstrogation';

export function explore(planets, currentRoute = [], foundRoutes = [], totalData = [], shortestRouteLength = null) {

  if (planets.fromPlanet == planets.toPlanet) {
    
    if (shortestRouteLength == null || currentRoute.length < shortestRouteLength) {
      shortestRouteLength = currentRoute.length;
    }

    foundRoutes.push({
      fromPlanet: currentRoute[0].fromPlanet,
      toPlanet: currentRoute[currentRoute.length -1].toPlanet,
      connections: currentRoute.length,
      time: totalData.totalTime,
      minTime: totalData.minTime,
      maxTime: totalData.maxTime,
      parsecs: totalData.totalParsecs,
      minParsecs: totalData.minParsecs,
      maxParsecs: totalData.maxParsecs,
      lightYears: totalData.totalLightYears,
      minLightYears: totalData.minLightYears,
      maxLightYears: totalData.maxLightYears,
      cost: totalData.totalCost,
      minCost: totalData.minCost,
      maxCost: totalData.maxCost,
      grade: gradeSegment(totalData.totalTime, totalData.minTime, totalData.maxTime, totalData),
      route: currentRoute
    });

    return [foundRoutes, shortestRouteLength];
  }

  if (shortestRouteLength !== null && currentRoute.length > (shortestRouteLength + 3)) {
    return [foundRoutes, shortestRouteLength];
  }

  let conns = getConnections(planets.fromPlanet)
  
  conns = conns.filter(c => !currentRoute.map(r => r.toPlanet).includes(c.toPlanet))

  if (conns.length === 0) {
    return [foundRoutes, shortestRouteLength];
  }

  conns.forEach(conn => {
    const nextPlanet = conn.toPlanet;
    const newRoute = [...currentRoute]; // `dup` in Ruby is equivalent to spreading the array in JS
  
    newRoute.push({
      fromPlanet: planets.fromPlanet,
      toPlanet: nextPlanet,
      hyperspaceType: conn.hyperspaceType,
      time: conn.time,
      minTime: conn.minTime,
      maxTime: conn.maxTime,
      parsecs: conn.parsecs,
      minParsecs: conn.minParsecs,
      maxParsecs: conn.maxParsecs,
      lightYears: conn.lightYears,
      minLightYears: conn.minLightYears,
      maxLightYears: conn.maxLightYears,
      costs: conn.costs,
      minCosts: conn.minCosts,
      maxCosts: conn.maxCosts,
      grade: gradeSegment(conn.time, conn.minTime, conn.maxTime, conn)
    });
  
    const newTotalData = {
      totalTime: (totalData.totalTime || 0) + conn.time,
      maxTime: (totalData.maxTime || 0) + conn.maxTime,
      minTime: (totalData.minTime || 0) + conn.minTime,
      totalParsecs: (totalData.totalParsecs || 0) + conn.parsecs,
      minParsecs: (totalData.minParsecs || 0) + conn.minParsecs,
      maxParsecs: (totalData.maxParsecs || 0) + conn.maxParsecs,
      totalLightYears: (totalData.totalLightYears || 0) + conn.lightYears,
      minLightYears: (totalData.minLightYears || 0) + conn.minLightYears,
      maxLightYears: (totalData.maxLightYears || 0) + conn.maxLightYears,
      totalCost: (totalData.totalCosts || 0) + conn.cost,
      minCost: (totalData.minCosts || 0) + conn.minCost,
      maxCost: (totalData.maxCosts || 0) + conn.maxCost,
    };
  
    [foundRoutes, shortestRouteLength] = explore(
      { fromPlanet: nextPlanet, toPlanet: planets.toPlanet },
      newRoute,
      foundRoutes,
      newTotalData,
      shortestRouteLength
    );
  });  

  return [foundRoutes, shortestRouteLength];
}