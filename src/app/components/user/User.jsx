import logout from '../../helpers/auth/logout';

function User(props) {

    return (

        <p className='logout-link' onClick={logout}>Logout</p>

    )
}

export default User;