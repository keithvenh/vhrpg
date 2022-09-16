import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import Auth from '../auth/Auth';
import MyAccount from '../auth/MyAccount';

export default function Navigation(props) {
    const context = useContext(UserContext);

    if(!context.user) {
        return (
            <ul className='navbar'>
                {/* <li className='signupIcon navItem' onClick={() => props.changeView('login')}><i className="fas fa-right-to-bracket"></i></li>
                <li className='loginIcon navItem' onClick={() => props.changeView('signup')}><i className="fas fa-user-plus"></i></li> */}
            </ul>
        )
    }
    return (

        <ul className='navbar'>

            <li className="characterIcon navItem" onClick={() => props.changeView('characterManagement')}><i className="fas fa-user-group"></i></li>
            <li className="vehiclesIcon navItem" onClick={() => props.changeView('missionControl')}><i className="fas fa-jet-fighter-up"></i></li>
            <li className="missionIcon navItem" onClick={() => props.changeView('missionControl')}><i className="fas fa-jedi"></i></li>

            <li className="homeIcon navItem" onClick={() => props.changeView('missionControl')}><i className="fas fa-home"></i></li>

            <li className="organizationIcon navItem" onClick={() => props.changeView('missionControl')}><i className="fas fa-chart-pie"></i></li>
            <li className="libraryIcon navItem" onClick={() => props.changeView('missionControl')}><i className="fas fa-book-journal-whills"></i></li>
            <li className="userIcon navItem" onClick={() => props.appView('auth')}><i className="fas fa-user-gear"></i></li>

        </ul>
    )
}