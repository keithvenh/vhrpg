import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../contexts/userContext';
import Delete from './Delete';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../../db/application/db';
import logout from '../../helpers/auth/logout';
import Loading from '../loading/Loading';
import Edit from './Edit';

function User(props) {

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

    return (

        <div className='User'>
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-address-card'></i></p></div>
                <div className='value'>
                    <p className='name'>{context.profile.name}</p>
                    <p className='name sw'>{context.profile.name}</p>
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
                    <p className='username'>{context.profile.username}</p>
                    <p className='username sw'>{context.profile.username}</p>
                </div>
            </div>
            
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-fingerprint'></i></p></div>
                <div className='value'>
                    <p className='age'>{getAge(context.profile.birthdate)} Rotations</p>
                    <p className='age sw'>{getAge(context.profile.birthdate)} Rotations</p>
                </div>
            </div>

            <div className='profileDetail'>
                <div className='icon'><p><i className='fa-brands fa-galactic-senate'></i></p></div>
                <div className='value'>
                    <p className='name'>{context.profile.role}</p>
                    <p className='name sw'>{context.profile.role}</p>
                </div>
            </div>

            <div  className='profileButtons'>
                <p className='deleteUserLink' onClick={() => props.changeView('delete', <Delete />)}><i className='fas fa-user-xmark'></i> Delete Account</p>
            </div>
        </div>

    )
}

export default User;