import logout from '../../helpers/auth/logout';

function Hq(props) {

    return (
        <div className='loading'>
            <h1><span className='sw'>Welcome</span>, {props.user.email}</h1>
            <div className='settings-cog'>
                <p><i className='fas fa-cog'></i></p>
                <p className='logout-link' onClick={logout}>Logout</p>
            </div>
        </div>
    )
}

export default Hq;