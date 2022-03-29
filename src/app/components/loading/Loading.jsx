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

    return (
        <div className='loading'>
            <h1>Loading...</h1>
        </div>
    )
}

export default Loading;