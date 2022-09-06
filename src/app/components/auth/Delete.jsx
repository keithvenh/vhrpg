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
        props.changeView('login');
    }

    return (
        <div className='Delete'>
            <p className='warningText'>Deleting your user account require re-entering your password.<br />This action cannot be undone.</p>

            <form className='login' onSubmit={handleSubmit} >

                <div className='authentication-errors'>
                    {errors}
                </div>

                <div className='formField password' id='login-password-container'>

                    <input id='password' className="password warning" type="password" value={password} placeholder="PASSWORD" onChange={validatePassword}/> 
                    
                </div>

                <div className='formField button'>
                    <button type='submit' id='submit' className='submit warning'>Delete User</button>
                </div>
            </form>
        </div>
    )
}