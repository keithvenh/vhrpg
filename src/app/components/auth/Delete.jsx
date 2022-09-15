import React, { useState, useEffect } from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../db/application/db';
import { destroyUser } from '../../helpers/auth/delete';

export default function Delete(props) {
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const auth = getAuth();

    function validatePassword(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
        reauthenticateWithCredential(auth.currentUser, credential).then((result) => {
            deleteDoc(doc(db, 'users', auth.currentUser.uid)).then(() => {
                destroyUser(auth.currentUser).then((result) => {
                    props.authView('login');
                    console.log(result);
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);
            })

        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='Delete'>
            <div className='formTitle'>
                <p className='title'>Delete User</p>
                <p className='subtitle sw'>Delete User</p>
            </div>
            <p className='warningText'>Deleting your user account requires re-entering your password.<br />This action cannot be undone.</p>

            <form className='deleteUserForm' onSubmit={handleSubmit} >

                <div className='authentication-errors'>
                    {errors}
                </div>

                <div className='formFieldContainer password'>

                    <div className='iconBox'><p><i className='fas fa-key'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Password</p>
                        <input id='password' className="password warning" type="password" value={password} onChange={validatePassword} autoFocus/>
                    </div>

                </div>

                <div className='formFieldContainer button'>
                    <button type='submit' id='submit' className='submit warning'>Delete User</button>
                </div>

            </form>
        </div>
    )
}