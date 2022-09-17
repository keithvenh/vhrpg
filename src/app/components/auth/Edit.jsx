import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import Delete from './Delete';
import { validateEmail, validatePassword, checkEmptyFields } from '../../helpers/auth/formValidation';
import Form from '../forms/Form';
import FormErrors from '../forms/FormErrors';
import FormInput from '../forms/FormInput';

export default function Edit(props) {

// ===== Use UserContext to find and update the User and Profile ===== //
    const context = useContext(UserContext);
  
// ===== Catch Errors for the Form ===== //
    // Initialize with empty array for map in return
    const [errors, setErrors] = useState([]);

// ==== user form for controlled inputs ===== //
    const [form, setForm] = useState({
        name: context.profile.name,
        email: context.user.email,
        username: context.profile.username,
        birthdate: context.profile.birthdate,
        role: context.profile.role,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

// ===== Manage User Input on Forms ===== //
    const handleInput = (event) => {
        // Spread current form state, then override changed value base on target
        setForm({...form, [event.target.name]: event.target.value});
    };

// ===== Handle Submission of Edit form ===== //
    async function handleSubmit(event) {
        // Prevent browser submission handling
        event.preventDefault();

        // Setup Error Tracking
        let formErrors = [];
        var validPassword = true;
        let validEmail = true;
        let noEmptyFields = true;

        // Validate Password if New Password Field is not empty
        if(form.newPassword) {

            if(validatePassword(form.newPassword)) {
                // Check that Passwords Match
                if (form.newPassword  === form.confirmNewPassword) {
                    // New Password is valid
                    validPassword = true;
                } else {
                    // Passwords Don't Match
                    validPassword = false;
                    formErrors = [...formErrors, "Passwords Don't Match"];
                }
            } else {
                // Password is invalid
                validPassword = false;
                formErrors = [...formErrors, "Invalid Password. Password must be at least 8 characters"];
            }
        }

        // Validate Email if it has changed
        if(form.email !== context.user.email) {
            // Check for a valid Email
            if (validateEmail(form.email)) {
                // Email is valid
                validEmail = true;
            } else {
                // Email is invalid
                validEmail = false;
                formErrors = [...formErrors, "Invalid Email"];
            }
        }

        // Check for Empty Fields
        if (checkEmptyFields(form)) {
            // No Fields are Empty, Validation Pass
            noEmptyFields = true;
        } else {
            // There is an Empty Field in the Form
            noEmptyFields = false;
            formErrors = [...formErrors, "All Fields Are Required"];
        }

        // Submit form if all valudations Pass
        if (validPassword && validEmail && noEmptyFields) {

            // Update the iteams that don't need authentication
            // Create the profile
            const profile = {
                name: form.name,
                username: form.username,
                birthdate: form.birthdate,
                role: form.role
            }

            // Update the document in the database
            updateDoc(doc(db, 'users', context.user.uid), {
                ...profile
            }).then(() => {
                // Set the profile in UserContext
                // Spead in current profile to avoid complete override
                context.setProfile({...context.profile, ...profile})

            }).catch((error) => {
                // An unexpected error occured when creating the user doc.
                formErrors = [...formErrors, "There was an unexpoected Error when creating your account."]
            })

            // Update Email or Password with New Credential if Changed
            if(form.email !== context.user.email || form.newPassword) {
                // get a new Auth Credential
                const credential = EmailAuthProvider.credential(context.user.email, form.currentPassword);

                // Reauthenticate User
                await reauthenticateWithCredential(context.user, credential).then(() => {

                    // Update Password if Changed
                    if(form.newPassword) {
                        updatePassword(context.user, form.newPassword).catch((error) => {
                            // Something went wrong updating the Password
                            formErrors =  [...formErrors, "Password Authentication Error"];
                        });
                    }

                    // Update Email if Changed
                    if(form.email !== context.user.email) {
                        updateEmail(context.user, form.email).catch((error) => {
                            // Something went wrong updating the Email
                            formErrors =  [...formErrors, "Email Authentication Error"];
                        })
                    }


                }).catch((error) => {
                    // Something went wrong during Authentication
                    formErrors =  [...formErrors, "Incorrect Current Password"];
                })
            }
            
        }

        // Add Errors to State
        setErrors(formErrors);

        // Switch back to Account if there were no errors
        if(formErrors.length === 0) {
            props.authView('myAccount');
        }
    };

    return (
        <div className='Edit'>

            <Form title='Edit Profile' handler={handleSubmit} >
                <FormErrors errors={errors} />

                <FormInput name='name' label='Full Name' type='name' value={form.name} handler={handleInput} />

                <FormInput name='email' label='Email' type='email' value={form.email} handler={handleInput} />
                
                <FormInput name='username' label='Username' type='username' value={form.username} handler={handleInput} />


                <div className='formFieldContainer role'>

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

                <FormInput name='birthdate' label='Birthdate' type='date' value={form.birthdate} handler={handleInput} />

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
                        <input type='submit' id='submit' className='button submit' value='Save'/>
                    </div> 
            </Form>

            <div  className='profileButtons'>
                <p className='deleteUserLink' onClick={() => props.authView('delete')}><i className='fas fa-user-xmark'></i> Delete Account</p>
            </div>
        </div>
    )

}