import {useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import Login from './Login';
import Edit from './Edit';
import logout from '../../helpers/auth/logout';
import Delete from './Delete';
import Signup from './Signup';
import MyAccount from './MyAccount';
import Loading from '../loading/Loading';
import { useEffect } from 'react';

export default function Auth() {
    const context = useContext(UserContext);
    const [view, setView] = useState(<Loading />);
    const [link, setLink] = useState();

    const authView = (link, view) => {
        setLink(link);
        setView(view);
    }

    function logoutUser() {
        logout();
    }

    useEffect(() => {
        setLink('myAccount');
        setView(<MyAccount changeView={authView} />);
    },[])

    if(!context.user) {
        return (
            <Login />
        )
    }

    return (
        <div className='Auth'>
            <ul className='AuthNav'>

                <li className={`AuthNavItem navItem ${link === 'myAccount'}`} onClick={() => {setView(<MyAccount changeView={authView}/>); setLink('myAccount')}}>My Account</li>
                <li className={`AuthNavItem navItem ${link === 'edit'}`} onClick={() => {setView(<Edit />); setLink('edit')}}>Edit Profile</li>
                <li className='AuthNavItem navItem logout' onClick={logoutUser}>Logout</li>

            </ul>
            {view}
        </div>
    )
}