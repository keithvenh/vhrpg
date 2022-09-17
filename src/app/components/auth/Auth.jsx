import {useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import Login from './Login';
import Edit from './Edit';
import logout from '../../helpers/auth/logout';
import Delete from './Delete';
import Signup from './Signup';
import MyAccount from './MyAccount';
import Loading from '../loading/Loading';
import PageNav from '../navigation/PageNav';
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
        editProfile: <Edit authView={authView} />,
        delete: <Delete authView={authView}/>,
        login: <Login appView={props.appView} />
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
                <PageNav links={['login', 'signup']} page="Auth" handler={authView} activeLink={link} /> 
                {view}
            </div>
        )
    }

    return (
        <div className='Auth'>
            <PageNav links={['myAccount', 'editProfile']} page="Auth" handler={authView} activeLink={link} >
                <li className='AuthNavItem pageNavItem logout' onClick={logoutUser}>Logout</li>
            </PageNav>
            {view}
        </div>
    )
}