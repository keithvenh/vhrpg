import './styles.scss';

import {useParams} from 'react-router-dom';
import {fetchForcePower} from '../../services/forcePowers';

export default function ForcePowerShowPage() {
  const {id} = useParams();
  const forcePower = fetchForcePower(id);

    return (
        <section className='ForcePowerShowPage'>
          <div className='force-power-overview'>
            <div className='force-power-data'>
              <h1><span>Force Power Tree:</span> {forcePower.name}</h1>
              <p>Prerequisites: Force Rating {forcePower.forceRatingRequired}+</p>
            </div>
            <div className='force-power-legend'>
              <p className='force'><i className='fas fa-square'></i> Force Ability</p>
            </div>
          </div>
          <div className='upgrades'>
            <div 
              className='upgrade'
              key="1"
              style={{
                gridRow: 1,
                gridColumn: "1 / span 4"
              }}
            >
              <div className='up-links'></div>
              <div className='upgrade-row'>
                <div className={`upgrade-box col-span-4`}>
                    <p className='upgrade-name'><i className='fas fa-square'></i> <span>{forcePower.name} Base Power</span></p>
                    <p className='upgrade-description'>{forcePower.descriptionShort}</p>
                    <p className='upgrade-cost'>{forcePower.cost} XP</p>
                </div>
                <div className={`right-link`}></div>
              </div>
            </div>
            {forcePower.upgrades.map(upgrade => (
                <div 
                  className='upgrade'
                  key={upgrade.number}
                  style={{
                    gridRow: upgrade.position.row,
                    gridColumn: `${upgrade.position.colStart} / span ${upgrade.position.colSpan}`
                  }}
                >
                  <div className='up-links' style={{gridTemplateColumns: `repeat(${upgrade.position.colSpan},1fr)`}}>
                    {upgrade.links.up?.map((upLink, index) => 
                      <div 
                        key={index}
                        className='up-link true'
                        style={{
                          gridColumn: `${upLink.colStart - upgrade.position.colStart + 1} / span ${upLink.colSpan}`
                        }}
                      ><div className='link-line'></div></div>)}
                  </div>
                  <div className='upgrade-row'>
                    <div className={`upgrade-box`}>
                        <p className='upgrade-name'><i className='fas fa-square'></i> <span>{upgrade.name}</span></p>
                        <p className='upgrade-description'>{upgrade.descriptionShort}</p>
                        <p className='upgrade-cost'>{upgrade.cost} XP</p>
                    </div>
                    <div className={`right-link ${upgrade.links.right}`}></div>
                  </div>
                    
                </div>
            ))}
          </div>
        </section>
    )
}