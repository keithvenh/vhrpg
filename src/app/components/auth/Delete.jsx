import React, { useState, useEffect } from 'react';

export default function Delete(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    function validateEmail(event) {
        setEmail(event.target.value);
    }

    function validatePassword(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.changeView('missionControl');
    }

    return (
        <div className='Delete'>
            <p className='warning'>By entering your email and password you are about to delete your user account. This action cannot be undone.</p>

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
                    <button type='submit' id='submit' className='submit'>Delete User</button>
                </div>
            </form>
        </div>
    )
}