import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import Loading from '../loading/Loading';

export default function MyAccount() {

    const context = useContext(UserContext);

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

    if(!context.user || !context.profile) {
        <Loading />
    }

    return (

        <div className='User'>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-address-card'></i></p></div>
                <div className='value'>
                    <p className='name'>{context.profile.private.name}</p>
                    <p className='name sw'>{context.profile.private.name}</p>
                </div>
            </div>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fa-regular fa-envelope'></i></p></div>
                <div className='value'>
                    <p className='email'>{context.user.email}</p>
                    <p className='email sw'>{context.user.email}</p>
                </div>
            </div>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-at'></i></p></div>
                <div className='value'>
                    <p className='username'>{context.profile.public.username}</p>
                    <p className='username sw'>{context.profile.public.username}</p>
                </div>
            </div>
            
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-fingerprint'></i></p></div>
                <div className='value'>
                    <p className='age'>{getAge(context.profile.private.birthdate)} Rotations</p>
                    <p className='age sw'>{getAge(context.profile.private.birthdate)} Rotations</p>
                </div>
            </div>

            <div className='profileDetail'>
                <div className='icon'><p><i className='fa-brands fa-galactic-senate'></i></p></div>
                <div className='value'>
                    <p className='name'>{context.profile.public.role}</p>
                    <p className='name sw'>{context.profile.public.role}</p>
                </div>
            </div>

        </div>

    )
}