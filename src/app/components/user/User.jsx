import logout from '../../helpers/auth/logout';

function User(props) {

    const user = props.user.user;
    const profile = props.user.profile;

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function logoutUser() {
        logout();
        props.changeView('login');
    }

    return (

        <div className='User'>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-at'></i></p></div>
                <div className='value'>
                    <p className='username'>{profile.username}</p>
                    <p className='username sw'>{profile.username}</p>
                </div>
            </div>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-address-card'></i></p></div>
                <div className='value'>
                    <p className='name'>{profile.name}</p>
                    <p className='name sw'>{profile.name}</p>
                </div>
            </div>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-fingerprint'></i></p></div>
                <div className='value'>
                    <p className='age'>{getAge(profile.birthdate)} Rotations</p>
                    <p className='age sw'>{getAge(profile.birthdate)} Rotations</p>
                </div>
            </div>

            <div className='profileDetail'>
                <div className='icon'><p><i className='fa-brands fa-galactic-senate'></i></p></div>
                <div className='value'>
                    <p className='name'>{profile.role}</p>
                    <p className='name sw'>{profile.role}</p>
                </div>
            </div>

            <div  className='profileButtons'>
                <p className='editLink' onClick={() => props.changeView('editUser')}><i className='fas fa-user-pen'> Edit</i></p>
                <p className='logoutLink' onClick={logoutUser }><i className='fas fa-right-from-bracket'></i> Logout</p>
                <p className='deleteUserLink' onClick={() => props.changeView('delete')}><i className='fas fa-user-xmark'></i> Delete</p>
            </div>
        </div>

    )
}

export default User;