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
        const mc = document.getElementById('mission-control');
        let charX = (mc.offsetWidth/2) - (char.offsetWidth/2);
        let charY = (mc.offsetHeight/2) - (char.offsetHeight/2);
        char.style.left = charX;
        char.style.top = charY;
        let facing = 'right';

        function moveScene(event, character, village, control) {

            let villageWidth = village.offsetWidth;
            let controlWidth = control.offsetWidth;
            let padding = control.offsetWidth - village.offsetWidth;
            let charWidth = character.offsetWidth;
            let leftWall = (padding/2);
            let rightWall = ((padding/2) + villageWidth) - (charWidth);
            let bottomWall = control.offsetHeight - character.offsetHeight;
            console.log(event.key);
            if(event.key === "ArrowRight" && (charX < rightWall)) {
                charX += 30;
                if(charX > rightWall) {
                    charX = rightWall;
                }
                character.style.left = charX + 'px';
                if(facing === 'left') {
                    char.style.transform = "scaleX(1)";
                    facing = 'right';
                }
            }
            else if(event.key === "ArrowLeft" && (charX > leftWall)) {
                console.log(leftWall);
                charX -= 30;
                if(charX < leftWall) {
                    charX = leftWall;
                }
                character.style.left = charX + 'px';
                if(facing === 'right') {
                    char.style.transform = "scaleX(-1)";
                    facing = "left";
                }
            }
            else if(event.key === "ArrowUp" && (charY > 0)) {
                console.log(leftWall);
                charY -= 30;
                if(charY < 0) {
                    charY = 0;
                }
                character.style.top = charY + 'px';
            }
            else if(event.key === "ArrowDown" && (charY < bottomWall)) {
                console.log(leftWall);
                charY += 30;
                if(charY > bottomWall) {
                    charY = bottomWall;
                }
                character.style.top = charY + 'px';
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
                <Houses />
                <div className='sidewalk'>

                </div>
                <img id='village-character' className='village-character' src={image} alt='' />
            </div>
        </div>
    )
}

export default MissionControl;