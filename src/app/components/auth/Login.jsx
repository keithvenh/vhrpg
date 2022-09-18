import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import login from '../../helpers/auth/login';
import getProfile from '../../helpers/users/getProfile';
import Form from '../forms/Form';
import FormErrors from '../forms/FormErrors';
import FormInput from '../forms/FormInput';
import FormButton from '../forms/FormButton';

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

            // Check if user is returned
            if(result.user) {
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
                setErrors(["Email or Password do not match."])
            }
        })
    }

    return (
        <Form title='Login' handler={handleSubmit} >

            <FormErrors errors={errors} />

            <FormInput
                name='email'
                type='email'
                label='Email'
                value={form.email}
                handler={handleInput}
                autoFocus={true}
            />

            <FormInput
                name='password'
                type='password'
                label='Password'
                value={form.password}
                handler={handleInput}
            />

            <FormButton value='Login' />

        </Form>
    )
}