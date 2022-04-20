import React from 'react';
import logout from '../../helpers/auth/logout';
import '../../assets/stylesheets/current-mission.scss'
import '../../assets/stylesheets/character-hud.scss'
import CharacterHUD from './CharacterHUD';

export default function CurrentMission (props) {
  

  return (
    <div id='current-mission' className='current-mission'>
        <div className='settings-cog'>
            <p><i className='fas fa-cog'></i></p>
            <p className='logout-link' onClick={logout}>Logout</p>
        </div>
        
        <div className='primary-container'>
            <div className='primary-hud' id='primary-hud'>
                <div className='hudTitle'>
                    <h2 className='title'>Primary Character</h2>
                    <p className='sw'>Primary Character</p>
                </div>
            </div>
        </div>
    </div>
  )
}
