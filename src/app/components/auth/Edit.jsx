import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import MyAccount from './MyAccount';

export default function Edit(props) {

    const context = useContext(UserContext);
    const [form, setForm] = useState({
        name: context.profile.name,
        email: context.user.email,
        username: context.profile.username,
        birthdate: context.profile.birthdate,
        role: context.profile.role,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        errors: ''
    });

    const handleInput = (event) => {
        console.log(event.target.name)
        setForm({...form, [event.target.name]: event.target.value});
    };

    async function handleSubmit(event) {

        event.preventDefault();
        // if newPassword is filled in, make sure confirmNewPassword matches, then attempt to update password
        // this will require currentPass for reauthentication (See Delete for reauthentication process)
        if(form.newPassword) {

            if(form.newPassword === form.confirmNewPassword) {

                const credential = EmailAuthProvider.credential(context.user.email, form.currentPassword);

                await reauthenticateWithCredential(context.user, credential).then(() => {

                    updatePassword(context.user, form.newPassword).then(() => {

                    }).catch((error) => {console.log(error)})

                }).catch((error) => console.log(error))

            } else {

                setForm({...form, errors: "New Password and Confirm New Password Must Match."})

            }
        }

        //if email has changed, require currentPass for reauthentication
        if(form.email !== context.user.email) {

            const credential = EmailAuthProvider.credential(context.user.email, form.currentPassword);

            await reauthenticateWithCredential(context.user, credential).then(() => {
                
                updateEmail(context.user, form.email).then(() => {

                }).catch((error) => {console.log(error)});

            }).catch((error) => {console.log(error)})

        }
        
        //update all other fields whether currentPass was given or not.
        //force non-empty fields for name, role, username
        if(form.name && form.role && form.username && form.birthdate) {
            //updateDoc()
            const profile = {
                name: form.name,
                username: form.username,
                birthdate: form.birthdate,
                role: form.role,
            }
            await updateDoc(doc(db, 'users', context.user.uid), {...profile}).catch((e) => {console.log(e)})

            context.setProfile({...context.profile, ...profile})
            props.changeView(<MyAccount changeView={props.changeView} />);
        } else {
            setForm({errors: "Name, Username, Role and Birthdate must be filled in."})
        }
    };

    return (
        <div className='Edit'>

            <form className='editForm' onSubmit={handleSubmit}>
                <div className='formField'>
                    <p className='errors'>{form.errors}</p>
                </div>

                <div className='formFieldContainer name'>

                    <div className='iconBox'><p><i className='fa-regular fa-envelope'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Full Name</p>
                        <input name='name' id='name' className="name" type="name" value={form.name} onChange={handleInput} autoFocus/>
                    </div>

                </div>

                <div className='formFieldContainer email'>

                        <div className='iconBox'><p><i className='fa-regular fa-address-card'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Email</p>
                            <input name='email' id='email' className="email" type="email" value={form.email} onChange={handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer username'>

                        <div className='iconBox'><p><i className='fas fa-at'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Username</p>
                            <input name='username' id='username' className="username" type="username" value={form.username} onChange={handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer name'>

                        <div className='iconBox'><p><i className='fa-brands fa-galactic-senate'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Role</p>
                            <select name="role" id="role" className='role' value={form.role} onChange={handleInput} >
                                <option value="Youngling">Youngling</option>
                                <option value="Padawan">Padawan</option>
                                <option value="Jedi Knight">Jedi Knight</option>
                                <option value="Jedi Master">Jedi Master</option>
                                <option value="Jedi Grand Master">Jedi Grand Master</option>
                                <option value="Droid">Droid</option>
                                <option value="Sith Apprentice">Sith Apprentice</option>
                                <option value="Sith Master">Sith Master</option>
                            </select>
                        </div>

                    </div>

                    <div className='formFieldContainer birthdate'>

                        <div className='iconBox'><p><i className='fa-regular fa-calendar-days'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Birthdate</p>
                            <input name='birthdate' id='birthdate' className="birthdate" type="date" value={form.birthdate} onChange={handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer password'>

                        <div className='iconBox'><p><i className='fas fa-lock'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Current Password</p>
                            <input name='currentPassword' id='currentPassword' className="password" type="password" value={form.currentPassword} onChange={handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer password'>

                        <div className='iconBox'><p><i className='fas fa-key'></i></p></div>
                        <div className='formField'>
                            <p className='label'>New Password</p>
                            <input name='newPassword' id='newPassword' className="password" type="password" value={form.newPassword} onChange={handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer password'>

                        <div className='iconBox'><p><i className='fas fa-unlock-keyhole'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Confirm New Password</p>
                            <input name='confirmNewPassword' id='confirmNewPassword' className="password" type="password" value={form.confirmNewPassword} onChange={handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer button'>
                        <input type='submit' id='submit' className='button submit'/>
                    </div> 
            </form>
        </div>
    )

}