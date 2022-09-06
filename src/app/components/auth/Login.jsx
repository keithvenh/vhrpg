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
        <form className='login' onSubmit={handleSubmit} >

            <div className='authentication-errors'>
                {errors}
            </div>

            <div className='formField email'>

                <input id='email' className="email" type="email" value={email} placeholder="EMAIL" onChange={validateEmail} autoFocus />

            </div>

            <div className='formField password' id='login-password-container'>

                <input id='password' className="password" type="password" value={password} placeholder="PASSWORD" onChange={validatePassword}/> 
                
            </div>

            <div className='formField button'>
                <input type='submit' id='submit' className='button submit'/>
            </div>
        </form>
    )
}