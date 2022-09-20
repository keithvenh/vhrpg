import React, { useState, useContext } from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../db/application/db';
import { destroyUser } from '../../helpers/auth/delete';
import { UserContext } from '../../contexts/userContext';
import Form from '../forms/Form';
import FormErrors from '../forms/FormErrors';
import FormInput from '../forms/FormInput';
import FormButton from '../forms/FormButton';

export default function Delete(props) {

// ===== Use UserContext for validation and deletion ===== //
    const context = useContext(UserContext);

// ===== Catch Errors for Form ===== //
    const [errors, setErrors] = useState([]);

// ===== Use form for controlled Inputs ===== //
    const [form, setForm] = useState({
        password: ''
    })
// ===== Manage User Input on Forms ===== //
    const handleInput = (event) => {
        // Spread current form state, then override changed value based on target
        setForm({...form, [event.target.name]: event.target.value});
    };

// =====  Handle Submission of Delete User Form ===== //
    async function handleSubmit(event) {
        // Prevent browser submission handling
        event.preventDefault();

        // setup form Errors
        let formErrors = [];

        // get a new Auth Credential
        const credential = EmailAuthProvider.credential(context.user.email, form.password);

        // Reauthenticate User
        await reauthenticateWithCredential(context.user, credential).then(() => {

            // Delete Profile Document
            deleteDoc(doc(db, 'users', context.user.uid)).then(() => {

                // Reset Profile in UserContext
                context.setProfile(null);
                // Delete User once User Doc is Deleted
                destroyUser(context.user).then(() => {

                    // Reset User in UserContext
                    context.setUser(null);

                    // Change view to Signup Page
                    props.authView('signup');
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);
            })

        }).catch((error) => {
            // Something went wrong during authentication
            formErrors =  ["Incorrect Password"];
        })

        setErrors(formErrors);
    }

    return (
    
        <div className='Delete'>
            <Form title='DeleteUser' handler={handleSubmit} >

                <FormErrors errors={errors} />

                <p className='warningText'>Deleting your user account requires re-entering your password.<br />This action cannot be undone.</p>

                <FormInput
                    name='password'
                    type='password'
                    label='Password'
                    value={form.password}
                    handler={handleInput}
                    autoFocus={true}
                />

                <FormButton label='Delete User' type='warning' />

            </Form>

        </div>
    )
}