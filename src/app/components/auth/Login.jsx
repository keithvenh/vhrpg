import React, { useState, useEffect } from 'react';
import login from '../../helpers/auth/login';

export default function Login(props) {
    const [email, setEmail]  = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();

    function validateEmail(event) {
        setEmail(event.target.value);
    }

    function validatePassword(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        login(email, password);
        props.changeView('missionControl');
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
                    <input type='submit' id='submit' className='button submit'/>
                </div>
            </form>
        </div>
    )
}