import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import createUser from '../../helpers/auth/signup';
import { validatePassword, validateEmail, checkEmptyFields } from '../../helpers/auth/formValidation';

export default function Signup(props) {

// ===== Use UserContext to update user and profile upon successful registration ===== //
    const context = useContext(UserContext);

// ===== Catch Errors for Form ===== // 
    const [errors, setErrors] = useState([]);

// ===== Use form for controlled form inputs ===== //
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        birthdate: '',
        role: '',
        password: '',
        confirmPassword: '',
    });

// ===== Manage User Input on Forms ===== //
    function handleInput(event) {
        // Spread current form state, then override changed value based on target
        setForm({...form, [event.target.name]: event.target.value});
    };

// ===== Handle submission of Signup Form ===== //
    async function handleSubmit(event) {
        // Prevent browser submission handling
        event.preventDefault();

        // Setup Errors
        let formErrors = [];

        let validPassword, validEmail, noEmptyFields;

        // check for valid Password
        if (validatePassword(form.password)) {
            // check that Passwords Match
            if(form.password === form.confirmPassword) {
                // Password is valid
                validPassword = true;
            } else {
                // Paswords Don't Match
                formErrors = [...formErrors, "Passwords Don't Match"];
            }
        } else {
            // Password is invalid
            formErrors = [...formErrors, "Invalid Password. Password must be at least 8 characters"];
        }

        // Check for a valid Email
        if (validateEmail(form.email)) {
            // Email is valid
            validEmail = true;
        } else {
            // Email is invalid
            formErrors = [...formErrors, "Invalid Email"];
        }

        // Check for Empty Fields
        if (checkEmptyFields(form)) {
            // No Fields are Empty, Validation Pass
            noEmptyFields = true;
        } else {
            // There is an Empty Field in the Form
            formErrors = [...formErrors, "All Fields Are Required"];
        }

        // Add Errors to State
        setErrors(formErrors);

        // Submit form if all validations Pass
        if(validPassword && validEmail && noEmptyFields) {

            // Create User Authentication Account
            createUser(form.email, form.password).then((result) => {

                // Confirm User Creation
                if(result.uid) {
                    // Show Loading Page while creating User
                    props.appView('loading');

                    // Set the user in the User Context
                    context.setUser(result);

                    // Create the profile
                    const profile = {
                        name: form.name,
                        username: form.username,
                        birthdate: form.birthdate,
                        role: form.role,
                        uid: result.uid
                    }

                    // Create the Document in the Database
                    // Use uid as the document id
                    setDoc(doc(db, 'users', result.uid), {
                        ...profile
                    }).then(() => {
                        // Set the profile in UserContext
                        context.setProfile({...profile});

                        // Change View from Loading to Mission Control
                        props.appView('missionControl');
                    }).catch((error) => {
                        // An unexpected error occured when creating the user doc.
                        formErrors = [...formErrors, "There was an unexpoected Error when creating your account."]
                    })
                } else {
                    // An unexpoected error occured with the database
                    formErrors = [...formErrors, "There was an enexpected Error when submitting the form. Please try again later."]
                }
            })
        }
    }

    return (
        <div className='Edit'>

            <form className='signupForm' onSubmit={handleSubmit}>
                <div className='formFieldContainer errors'>
                
                    <div className='formField'>
                        <div className='errors'>
                            {errors.map((error, index) => <p className='error' key={index}>{error}</p>)}
                        </div>
                    </div>
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
                            <option value=''></option>
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