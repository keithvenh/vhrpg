import React from 'react';

export default function RouteTable({routes}) {
  return (
    <table className='route-table'>
      <thead>
        <tr><th className='table-heading' colSpan='6'>Routes</th></tr>
      </thead>
      <tbody>
        {routes.map((route, index) => (
          <React.Fragment key={index}>
            <tr className='route-description'>
              <td colSpan='6'>{route.route.map(r => `${r.fromPlanet} > `)}{route.toPlanet}</td>
            </tr>
            <tr className='route-data'>
              <th>Grade</th>
              <th>Connections</th>
              <th>Time</th>
              <th>Cost</th>
              <th>Parsecs</th>
              <th>Light Years</th>
            </tr>
            <tr className="route-data">
              <td className='sw'>{route.grade}</td>
              <td>{route.connections}</td>
              <td>{route.time.toFixed(1)}h</td>
              <td>{route.cost.toFixed(0)}cr</td>
              <td>{route.parsecs.toFixed(0)}</td>
              <td>{route.lightYears.toFixed(0)}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
} 