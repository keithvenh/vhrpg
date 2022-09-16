import React, { useState, useContext } from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../db/application/db';
import { destroyUser } from '../../helpers/auth/delete';
import { UserContext } from '../../contexts/userContext';

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
            <div className='formTitle'>
                <p className='title'>Delete User</p>
                <p className='subtitle sw'>Delete User</p>
            </div>
            <p className='warningText'>Deleting your user account requires re-entering your password.<br />This action cannot be undone.</p>

            <form className='deleteUserForm' onSubmit={handleSubmit} >

                <div className='formFieldContainer errors'>
                    
                    <div className='formField'>
                        <div className='errors'>
                            {errors.map((error, index) => <p className='error' key={index}>{error}</p>)}
                        </div>
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
                    <button type='submit' id='submit' className='submit warning'>Delete User</button>
                </div>

            </form>
        </div>
    )
}