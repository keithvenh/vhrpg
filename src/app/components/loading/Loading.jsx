import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

function Loading(props) {

    // check for authentication token
    const auth = getAuth();

    // show loading page for 4 seconds
    setTimeout(
    () => {onAuthStateChanged(auth, (user) => {
        // go to HQ if user exists
        if(user) {
          props.updateView('mission control', user);
        // go to login if user does not exist
        } else {
          props.updateView('login');
        }
    })}, 100);

    // randomly choose a character to display on screen
    // this is purely cosmetic
    let int = Math.floor(Math.random()*2);
    let char;
    if(int === 0) {
      char = "Pax";
    } else {
      char = "Ru"
    }
    const image = require('../../assets/images/' + char + '-Goes-Walking.gif');

    // run this code after the component mounts
    useEffect(() => {
      // move the character image from left to right
      document.getElementById('loading-image').classList.add('march-right');

      // set up the loading text
      let loader = "Loading"
      for(let i=1; i <= loader.length; i++) {
        // change one letter to star wars aurebesh every half second
        setTimeout(() => {
          document.getElementById('loading-heading').innerHTML="<span class='sw'>" + loader.substring(0,i) + "</span>" + loader.substring(i, loader.length);
        }, i * 500)
      }
    })

    return (
        <div className='loading'>
            <h1 className='loading-heading' id="loading-heading">Loading</h1>
            <div className="loading-image" id='loading-image'>
              <img className='loading-image-character' src={image} alt='' />
            </div>
        </div>
    )

    
}

export default Loading;