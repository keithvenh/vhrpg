import React from 'react';
import logout from '../../helpers/auth/logout';
import CharacterHUD from './CharacterHUD';

export default function CurrentMission (props) {
  
    const wt = 16;
    const currentWounds = 14;
    const health = Array.from(Array(wt - currentWounds).keys());
    const wounds = Array.from(Array(currentWounds).keys());
    
    const st = 12;
    const currentStrain = 6;
    const stress = Array.from(Array(st - currentStrain).keys());
    const strain = Array.from(Array(currentStrain).keys());
    
    let char = "Ru"
    const image = require('../../assets/images/' + char + '-Goes-Walking.gif');

  return (
    <div id='current-mission' className='current-mission'>
        <div className='settings-cog'>
            <p><i className='fas fa-cog'></i></p>
            <p className='logout-link' onClick={logout}>Logout</p>
        </div>
        
        <div className='primary-container'>
            <div className='primary-hud' id='primary-hud'>
                <img className='hudImg' src={image} alt='' />
                <div className='hudTitle'>
                    Ajairu Kogiti
                    <div className='status-bar-container'>
                        {health.map(i => <div className='wt' />)}
                        {wounds.map(i => <div className='wt' style={{'background-color': 'white'}} />)}
                    </div>
                    <div className='status-bar-container'>
                        {stress.map(i => <div className='wt' style={{'background-color': 'blue'}}/>)}
                        {strain.map(i => <div className='wt' style={{'background-color': 'white'}} />)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
