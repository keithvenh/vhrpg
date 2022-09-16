import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import login from '../../helpers/auth/login';
import getProfile from '../../helpers/users/getProfile';

export default function Login(props) {

// ===== Use UserContext to update user and profile upon successful Login ===== //
    const context = useContext(UserContext);

// ===== Catch Errors for Form ===== //
    const [errors, setErrors] = useState([]);

// ===== User form for controlled Inputs ===== //
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

// ===== Manage User Input on Forms ===== //
    const handleInput = (event) => {
        // Spread current form state, then override changed value based on target
        setForm({...form, [event.target.name]: event.target.value});
    };

// ===== Handle Submisson of Login Form ===== //
    async function handleSubmit(event) {
        // Prevent browser submission handling
        event.preventDefault();

        // Attempt to Login User
        login(form.email, form.password).then((result) => {

            console.log(result);
            // Check if user is returned
            if(result.user.uid) {
                // Show loading page while loading Profile
                props.appView('loading');

                // Load profile from database
                getProfile(result.user).then((profile) => {
                    // set profile UserContext
                    context.setProfile(profile.data());
                    // Change View to Home Page
                    props.appView('missionControl');
                });
            } else {
                // User was not able to be logged in
                setErrors(["Username or Password do not match."])
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

                <div className='formFieldContainer errors'>
                    
                    <div className='formField'>
                        <div className='errors'>
                            {errors.map((error, index) => <p className='error' key={index}>{error}</p>)}
                        </div>
                    </div>
                </div>

                <div className='formFieldContainer email'>

                    <div className='iconBox'><p><i className='fa-regular fa-address-card'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Email</p>
                        <input name='email' id='email' className="email" type="email" value={form.email} onChange={handleInput} />
                    </div>

                </div>

                <div className='formFieldContainer password'>

                    <div className='iconBox'><p><i className='fas fa-lock'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Password</p>
                        <input name='password' id='password' className="password" type="password" value={form.password} onChange={handleInput} />
                    </div>

                </div>

                <div className='formFieldContainer button'>
                    <input type='submit' id='submit' className='button submit' value='Login'/>
                </div>
            </form>
        </div>
    )
}