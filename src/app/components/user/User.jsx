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
            <p className='username'>{profile.username}</p>
            <p className='name'>{profile.firstName} {profile.lastName}</p>
            <p className='role'>{profile.role}</p>
            <p className='age'>{getAge(profile.birthdate)} Years Old</p>
            <p className='logoutLink' onClick={logoutUser }><i className='fas fa-right-from-bracket'></i> Logout</p>
            <p className='deleteUserLink' onClick={() => props.changeView('delete')}><i className='fas fa-user-xmark'></i> Delete</p>
        </div>

    )
}

export default User;