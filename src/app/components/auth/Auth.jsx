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

export default function Auth(props) {
    const context = useContext(UserContext);
    const [view, setView] = useState(<Loading />);
    const [link, setLink] = useState();
    
    const authView = (link) => {
        setView(views[link]);
        setLink(link);
    }

    const views = {
        myAccount: <MyAccount />,
        signup: <Signup appView={props.appView} />,
        edit: <Edit authView={authView} />,
        delete: <Delete authView={authView}/>,
        login: <Login appView={props.appView} />,
    }

    function logoutUser() {
        logout();
        authView('login');
    }

    useEffect(() => {
        context.user ? authView('myAccount') : authView('login');
    },[])

    if(!context.user) {
        return (
            <div className='Auth'>
                <ul className='AuthNav'>

                    <li className={`AuthNavItem navItem ${link === 'login'}`} onClick={() => {authView('login')}}>Login</li>
                    <li className={`AuthNavItem navItem ${link === 'signup'}`} onClick={() => {authView('signup')}}>Signup</li>
                </ul>
                {view}
            </div>
        )
    }

    return (
        <div className='Auth'>
            <ul className='AuthNav'>

                <li className={`AuthNavItem navItem ${link === 'myAccount'}`} onClick={() => {authView('myAccount')}}>My Account</li>
                <li className={`AuthNavItem navItem ${link === 'edit'}`} onClick={() => {authView('edit')}}>Edit Profile</li>
                <li className='AuthNavItem navItem logout' onClick={logoutUser}>Logout</li>
            </ul>
            {view}
        </div>
    )
}