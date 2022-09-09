import {useState, useEffect} from 'react';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../../db/application/db';
import logout from '../../helpers/auth/logout';
import Loading from '../loading/Loading';

function User(props) {

    const [user, setUser] = useState(props.user);
    const [initializing, setInitializing] = useState(true);

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    async function fetchProfile(user) {
        const profile = await getDoc(doc(db, 'users', user.uid));
        setUser({...user, ...profile.data()})
        if (initializing) setInitializing(false);
    }

    function logoutUser() {
        logout();
        props.changeView('login');
    }

    useEffect(() => {
        fetchProfile(user);
    }, [])

    if(initializing) {
        return (
            <Loading />
        )
    }

    return (

        <div className='User'>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-at'></i></p></div>
                <div className='value'>
                    <p className='username'>{user.username}</p>
                    <p className='username sw'>{user.username}</p>
                </div>
            </div>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-address-card'></i></p></div>
                <div className='value'>
                    <p className='name'>{user.name}</p>
                    <p className='name sw'>{user.name}</p>
                </div>
            </div>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-fingerprint'></i></p></div>
                <div className='value'>
                    <p className='age'>{getAge(user.birthdate)} Rotations</p>
                    <p className='age sw'>{getAge(user.birthdate)} Rotations</p>
                </div>
            </div>

            <div className='profileDetail'>
                <div className='icon'><p><i className='fa-brands fa-galactic-senate'></i></p></div>
                <div className='value'>
                    <p className='name'>{user.role}</p>
                    <p className='name sw'>{user.role}</p>
                </div>
            </div>

            <div  className='profileButtons'>
                <p className='editLink' onClick={() => props.changeView('editUser')}><i className='fas fa-user-pen'> Edit</i></p>
                <p className='logoutLink' onClick={logoutUser }><i className='fas fa-right-from-bracket'></i> Logout</p>
                <p className='deleteUserLink' onClick={() => props.changeView('delete')}><i className='fas fa-user-xmark'></i> Delete</p>
            </div>
        </div>

    )
}

export default User;