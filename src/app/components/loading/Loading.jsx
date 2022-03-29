import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Loading(props) {

    const auth = getAuth();
    setTimeout(
    () => {onAuthStateChanged(auth, (user) => {
        if(user) {
          props.updateView('hq', user);
        } else {
          props.updateView('login');
        }
    })}, 3000);

    let int = Math.floor(Math.random()*2);
    console.log(int === 0);
    if(int === 0) {
      char = "Ru";
    } else {
      char = "Pax"
    }
    const image = require('../../assets/images/' + char + '-Goes-Walking.gif');

    return (
        <div className='loading'>
            <h1>Loading...</h1>
            <div className="loading-image">
              <img className='loading-image-character' src={image} alt='' />
            </div>
        </div>
    )
}

export default Loading;