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
import Inbox from './Inbox';

export default function Auth(props) {
    const context = useContext(UserContext);
    const [view, setView] = useState(<Loading />);
    const [link, setLink] = useState();
    
    const authView = (link) => {
        const views = {
            myAccount: <MyAccount />,
            signup: <Signup appView={props.appView} />,
            editProfile: <Edit authView={authView} />,
            delete: <Delete authView={authView}/>,
            login: <Login appView={props.appView} />,
            inbox: <Inbox appView={props.appView} authView={authView} />
        }
        
        setView(views[link]);
        setLink(link);
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
            <div className='viewHeader'>
                <h1 className='viewTitle title'>Account Management</h1>
                <h2 className='viewSubtitle subtitle'>Account Management</h2>
            </div>
            <PageNav links={['myAccount', 'editProfile', 'inbox']} page="Auth" handler={authView} activeLink={link} >
                <li className='AuthNavItem pageNavItem logout' onClick={logoutUser}>Logout</li>
            </PageNav>
            {view}
        </div>
    )
}