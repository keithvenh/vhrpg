import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import createUser from '../../helpers/auth/signup';

export default function Signup(props) {

    const context = useContext(UserContext);
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        birthdate: '',
        role: '',
        password: '',
        confirmPassword: '',
        errors: ''
    });

    const handleInput = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if(form.password === form.confirmPassword) {

            createUser(form.email, form.password).then((result) => {
                console.log(result);
                if(result.error) {
                    setForm({...form, errors: "There is an error on your Form"})
                } else {
                    props.appView('loading');
                    context.setUser(result);
                    const profile = {
                        name: form.name,
                        username: form.username,
                        birthdate: form.birthdate,
                        role: form.role,
                        uid: result.uid
                    }
                    setDoc(doc(db, 'users', result.uid), {
                        ...profile
                    }).then(() => {
                        context.setProfile({...profile});
                        props.appView('missionControl');
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }).catch((error) => {
                setForm({...form, errors: error.code})
            })
        } else {
            setForm({...form, errors: "Passwords Don't Match."})
        }
    }

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

                <div className='formFieldContainer role'>

                    <div className='iconBox'><p><i className='fa-brands fa-galactic-senate'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Role</p>
                        <select name="role" id="role" className='role' value={form.role} onChange={handleInput} >
                            <option value="Youngling">Youngling</option>
                            <option value="Padawan">Padawan</option>
                            <option value="Droid">Droid</option>
                            <option value="Sith Apprentice">Sith Apprentice</option>
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
                        <p className='label'>Password</p>
                        <input name='password' id='password' className="password" type="password" value={form.password} onChange={handleInput} />
                    </div>

                </div>

                <div className='formFieldContainer password'>

                    <div className='iconBox'><p><i className='fas fa-lock'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Confirm Password</p>
                        <input name='confirmPassword' id='confirmPassword' className="password" type="password" value={form.confirmPassword} onChange={handleInput} />
                    </div>

                </div>

                <div className='formFieldContainer button'>
                    <input type='submit' id='submit' className='button submit' value='Signup' />
                </div> 
            </form>

        </div>
    )

}