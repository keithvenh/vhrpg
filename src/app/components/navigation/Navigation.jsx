import logout from '../../helpers/auth/logout';

function Navigation(props) {

    return (

        <ul className='navbar'>

            <li className="characterIcon navItem" onClick={() => props.updateView('characterManagement')}><i className="fas fa-user-group"></i></li>
            <li className="vehiclesIcon navItem" onClick={() => props.updateView('mission control')}><i className="fas fa-jet-fighter-up"></i></li>
            <li className="missionIcon navItem" onClick={() => props.updateView('mission control')}><i className="fas fa-jedi"></i></li>

            <li className="homeIcon navItem" onClick={() => props.updateView('mission control')}><i className="fas fa-home"></i></li>

            <li className="organizationIcon navItem" onClick={() => props.updateView('mission control')}><i className="fas fa-chart-pie"></i></li>
            <li className="libraryIcon navItem" onClick={() => props.updateView('mission control')}><i className="fas fa-book-journal-whills"></i></li>
            <li className="userIcon navItem" onClick={() => props.updateView('user')}><i className="fas fa-cog"></i></li>

        </ul>
    )
}

export default Navigation;