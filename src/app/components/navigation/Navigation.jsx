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


            <li className={`navItem ${location.pathname === "/"} homeLink`}>
                <Link to="/">
                    <i className='fas fa-home'></i>
                    <p>Home</p>
                </Link>
            </li>

            <li className={`navItem ${location.pathname.split('/')[1] === "characters"}`}>
                <Link to="/characters">
                    <i className='fas fa-user'></i>
                    <p>Denizens</p>
                </Link>
            </li>

            <li className={`navItem ${location.pathname.split('/')[1] === "organizations"}`}>
                <Link to="/organizations">
                    <i className='fas fa-landmark'></i>
                    <p>Orgs</p>
                </Link>
            </li>

            <li className={`navItem ${location.pathname.split('/')[1] === "planets"}`}>
                <Link to="/planets">
                    <i className='fas fa-globe'></i>
                    <p>Systems</p>
                </Link>
            </li>

            <li className={`navItem ${location.pathname.split('/')[1] === "species"}`}>
                <Link to="/species">
                    <i className='fas fa-user-astronaut'></i>
                    <p>Species</p>
                </Link>
            </li>

            <li className={`navItem ${location.pathname.split('/')[1] === "vehicles"}`}>
                <Link to="/vehicles">
                    <i className='fa-brands fa-galactic-senate'></i>
                    <p>Vehicles</p>
                </Link>
            </li>

            <li className={`navItem ${location.pathname.split('/')[1] === "contacts"}`}>
                <Link to="/contacts">
                    <i className='fas fa-address-book'></i>
                    <p>Contacts</p>
                </Link>
            </li>

            <li className={`userIcon navItem ${location.pathname === "/profile"}`}>
                <Link to={`/profile`}>
                    <i className='fas fa-id-card'></i>
                    <p>Profile</p>
                </Link>
            </li>

        </ul>
    )
}