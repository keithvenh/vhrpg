import logout from '../../helpers/auth/logout';
import Houses from './Houses';
import { useEffect } from 'react';

function MissionControl(props) {

    let int = Math.floor(Math.random()*2);
    let char;
    if(int === 0) {
      char = "Pax";
    } else {
      char = "Ru"
    }
    const image = require('../../assets/images/' + char + '-Goes-Walking.gif');

    useEffect(() => {
        // get the character and the houses
        const char = document.getElementById('village-character');
        const houses = document.getElementById('houses-container');
        let charLoc = 120;
        let facing = 'right';

        function moveScene(event, character, village) {

            let width = village.offsetWidth;
            console.log(width);
            if(event.key === "ArrowRight" && (charLoc < (width - (character.offsetWidth + 32)))) {
                charLoc += 30;
                character.style.left = charLoc + 'px';
                if(facing === 'left') {
                    char.style.transform = "scaleX(1)";
                    facing = 'right';
                }
            }
            else if(event.key === "ArrowLeft" && (charLoc > 32)) {
                charLoc -= 30;
                character.style.left = charLoc + 'px';
                if(facing === 'right') {
                    char.style.transform = "scaleX(-1)";
                    facing = "left";
                }
            }
            console.log(character);
            console.log(village);

        }
  
        // listen for a keypress event
        document.addEventListener("keydown", (e) => moveScene(e, char, houses));
      })

    return (
        <div className='mission-control'>
            <div className='settings-cog'>
                <p><i className='fas fa-cog'></i></p>
                <p className='logout-link' onClick={logout}>Logout</p>
            </div>
            <div className='village'>
                <Houses />
                <div className='sidewalk'>

                </div>
                <img id='village-character' className='village-character' src={image} alt='' />
            </div>
        </div>
    )
}

export default MissionControl;