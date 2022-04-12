import logout from '../../helpers/auth/logout';
import Houses from './Houses';
import { useEffect } from 'react';

function MissionControl(props) {

    const up = require('../../assets/images/characterUp.png');
    const down = require('../../assets/images/characterDown.png');
    const left = require('../../assets/images/characterLeft.png');
    const right = require('../../assets/images/characterRight.png');
    let image = down;

    useEffect(() => {
        // get the character and the houses
        const char = document.getElementById('village-character');
        const houses = document.getElementById('houses-container');
        const mc = document.getElementById('mission-control');
        let charX = (mc.offsetWidth/2) - (char.offsetWidth/2);
        let charY = (mc.offsetHeight/2) - (char.offsetHeight/2);
        char.style.left = charX + 'px';
        char.style.top = charY + 'px';

        function moveScene(event, character, village, control) {

            let villageWidth = village.offsetWidth;
            let controlWidth = control.offsetWidth;
            let padding = control.offsetWidth - village.offsetWidth;
            let charWidth = character.offsetWidth;
            let leftWall = (padding/2);
            let rightWall = ((padding/2) + villageWidth) - (charWidth);
            let bottomWall = control.offsetHeight - character.offsetHeight;
            if(event.key === "ArrowRight" && (charX < rightWall)) {
                charX += 30;
                if(charX > rightWall) {
                    charX = rightWall;
                }
                character.style.left = charX + 'px';
                char.src = right;
            }
            else if(event.key === "ArrowLeft" && (charX > leftWall)) {
                charX -= 30;
                if(charX < leftWall) {
                    charX = leftWall;
                }
                character.style.left = charX + 'px';
                char.src = left;
            }
            else if(event.key === "ArrowUp" && (charY > 0)) {
                charY -= 30;
                if(charY < 0) {
                    charY = 0;
                }
                character.style.top = charY + 'px';
                char.src = up;
            }
            else if(event.key === "ArrowDown" && (charY < bottomWall)) {
                charY += 30;
                if(charY > bottomWall) {
                    charY = bottomWall;
                }
                character.style.top = charY + 'px';
                char.src = down;
            }

        }
  
        // listen for a keypress event
        document.addEventListener("keydown", (e) => moveScene(e, char, houses, mc));
      })

    return (
        <div id='mission-control' className='mission-control'>
            <div className='settings-cog'>
                <p><i className='fas fa-cog'></i></p>
                <p className='logout-link' onClick={logout}>Logout</p>
            </div>
            <div className='village'>
                <div className='row'>

                    <div className='rules' id='rules'></div>
                    <div className='street vert four'></div>
                    <div className='park' id='park'></div>
                    <div className='wall vert four'></div>
                    <div className='businessScene' id='businessScene'></div>
                    <div className='darkShroud' id='darkShroud'></div>
                    <div className='sithTemple' id='sithTemple'></div>

                </div>
                <Houses />
                <div className='sidewalk'>

                </div>
                <img id='village-character' className='village-character' src={image} alt='' />
            </div>
        </div>
    )
}

export default MissionControl;