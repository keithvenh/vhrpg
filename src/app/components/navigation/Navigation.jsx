import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import {Link, useLocation } from 'react-router-dom';
import Auth from '../auth/Auth';
import MyAccount from '../auth/MyAccount';

export default function Navigation(props) {
    const context = useContext(UserContext);
    const location = useLocation();

    if(!context.user) {
        return (
            <ul className='navbar'>
                {/* <li className='signupIcon navItem' onClick={() => props.changeView('login')}><i className="fas fa-right-to-bracket"></i></li>
                <li className='loginIcon navItem' onClick={() => props.changeView('signup')}><i className="fas fa-user-plus"></i></li> */}
            </ul>
        )
    }
    return (

        <ul className='primaryNav'>

            {/* <li className="characterIcon navItem" onClick={() => props.appView('users', {subview: 'findFriend'})}><i className="fas fa-user-group"></i></li>
            <li className="vehiclesIcon navItem" onClick={() => props.changeView('missionControl')}><i className="fas fa-jet-fighter-up"></i></li>
            <li className={`missionIcon navItem ${props.link === 'campaigns'}`} onClick={() => props.appView('campaigns')}><i className="fas fa-jedi"></i></li> */}

            <li className={`navItem ${location.pathname.split('/')[1] === "characters"}`}>
                <Link to="/characters">
                    <i className='fas fa-user-secret'></i>
                    <p>Characters</p>
                </Link>
            </li>

            <li className={`navItem ${location.pathname === "/"} homeLink`}>
                <Link to="/">
                    <i className='fas fa-home'></i>
                    <p>Home</p>
                </Link>
            </li>

            {/* <li className="organizationIcon navItem" onClick={() => props.changeView('missionControl')}><i className="fas fa-chart-pie"></i></li>
            <li className="libraryIcon navItem" onClick={() => props.changeView('missionControl')}><i className="fas fa-book-journal-whills"></i></li> */}
            <li className={`userIcon navItem ${location.pathname === "/profile"}`}>
                <Link to={`/profile`}>
                    <i className='fas fa-id-badge'></i>
                    <p>Profile</p>
                </Link>
            </li>

        </ul>
    )
}

// export default function TopLevelNav() {
//   const location = useLocation();

//   return (
//     <ul id='topLevelNav'>
//       <li>
//         <Link to="/" className={location.pathname === "/" ? "active" : ""}>
//           Home
//         </Link>
//       </li>
//       <li>
//         <Link to="/contacts" className={location.pathname.startsWith("/contacts") ? "active" : ""}>
//           Contacts
//         </Link>
//       </li>
//       <li>
//         <Link to="/donations" className={location.pathname.startsWith("/donations") ? "active" : ""}>
//           Donations
//         </Link>
//       </li>
//     </ul>
//   )
// }