import {explore} from './explore';

export default function getRoutes(planets) {
  let visitedPlanets = []
  let foundRoutes = []
  let [routes, shortestRoute] = explore(planets, visitedPlanets, foundRoutes)

  return routes
}
