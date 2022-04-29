import React from 'react';
import logout from '../../helpers/auth/logout';
import CharacterHUD from './CharacterHUD';

export default function CurrentMission (props) {
  
    const wt = 16;
    const currentWounds = 3;
    
    const health = Array.from(Array(wt - currentWounds).keys());
    const wounds = Array.from(Array(currentWounds).keys());

  return (
    <div id='current-mission' className='current-mission'>
        <div className='settings-cog'>
            <p><i className='fas fa-cog'></i></p>
            <p className='logout-link' onClick={logout}>Logout</p>
        </div>
        
        <div className='primary-container'>
            <div className='primary-hud' id='primary-hud'>
                <div className='hudTitle'>
                    <div className='status-bar-container'>
                        WT
                        {health.map(i => <div className='wt' />)}
                        {wounds.map(i => <div className='wt' style={{'background-color': 'white'}} />)}                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
