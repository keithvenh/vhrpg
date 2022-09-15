import React, { useState, useEffect } from 'react';
import login from '../../helpers/auth/login';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import getProfile from '../../helpers/users/getProfile';

export default function Login(props) {
    const context = useContext(UserContext);
    const [email, setEmail]  = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();

    function validateEmail(event) {
        setEmail(event.target.value);
    }

    function validatePassword(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        login(email, password).then((result) => {
            if(result.error) {
                setErrors("Username or Password do not match.")
            } else {
                props.appView('loading');
                getProfile(result.user).then((profile) => {
                    context.setProfile(profile.data());
                    props.appView('missionControl');
                });
            }
        })
    }

    return (
        <div className='Login'>
            <div className='formTitle'>
                <p className='title'>Login</p>
                <p className='subtitle sw'>Login</p>
            </div>
            <form className='loginForm' onSubmit={handleSubmit} >

                <div className='authentication-errors'>
                    {errors}
                </div>

                <div className='formFieldContainer email'>

                    <div className='iconBox'><p><i className='fa-regular fa-envelope'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Email</p>
                        <input id='email' className="email" type="email" value={email} onChange={validateEmail} autoFocus />
                    </div>

                </div>

                <div className='formFieldContainer password'>

                    <div className='iconBox'><p><i className='fas fa-key'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Password</p>
                        <input id='password' className="password" type="password" value={password} onChange={validatePassword} />
                    </div>

                </div>

                <div className='formFieldContainer button'>
                    <input type='submit' id='submit' className='button submit' value='Login'/>
                </div>
            </form>
        </div>
    )
}