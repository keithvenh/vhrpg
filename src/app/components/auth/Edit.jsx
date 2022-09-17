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
import FormSelect from '../forms/FormSelect';
import FormButton from '../forms/FormButton';

export default function Edit(props) {

// ===== Use UserContext to find and update the User and Profile ===== //
    const context = useContext(UserContext);
  
// ===== Catch Errors for the Form ===== //
    // Initialize with empty array for map in return
    const [errors, setErrors] = useState([]);

// ==== user form for controlled inputs ===== //
    const [form, setForm] = useState({
        name: context.profile.private.name,
        email: context.user.email,
        username: context.profile.public.username,
        birthdate: context.profile.private.birthdate,
        role: context.profile.public.role,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

// ===== Options for Select Input ===== //
    const roleOptions = [
        {value: 'Youngling', display: "Youngling"},
        {value: 'Padawan', display: "Padawan"},
        {value: 'Jedi Knight', display: "Jedi Knight"},
        {value: 'Jedi Master', display: "Jedi Master"},
        {value: 'Jedi Grand Master', display: "Jedi Grand Master"},
        {value: 'Protocol Droid', display: "Protocol Droid"},
        {value: 'Astromech Droid', display: "Astromech Droid"},
        {value: 'Security Droid', display: "Security Droid"},
        {value: 'Sith Apprentice', display: "Sith Apprentice"},
        {value: 'Sith Master', display: "Sith Master"},
        {value: 'Inquisitor', display: 'Inquisitor'},
        {value: 'Grand Inquisitor', display: 'Grand Inquisitor'},
        {value: 'Bounty Hunter', display: 'Bounty Hunter'}
    ]

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
                public: {
                    ...context.profile.public,
                    username: form.username,
                    role: form.role
                },
                private: {
                    ...context.profile.private,
                    name: form.name,
                    birthdate: form.birthdate
                }
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

                <FormInput name='name' label='Full Name' type='name' value={form.name} handler={handleInput} autoFocus={true}/>

                <FormInput name='email' label='Email' type='email' value={form.email} handler={handleInput} />
                
                <FormInput name='username' label='Username' type='username' value={form.username} handler={handleInput} />

                <FormSelect name='role' label='Role' value={form.role} options={roleOptions} handler={handleInput} />

                <FormInput name='birthdate' label='Birthdate' type='date' value={form.birthdate} handler={handleInput} />

                <FormInput name='currentPassword' label='Current Password' type='password' value={form.currentPassword} handler={handleInput} />

                <FormInput name='newPassword' label='New Password' type='password' value={form.newPassword} handler={handleInput} />

                <FormInput name='confirmNewPassword' label='Confirm New Password' type='password' value={form.confirmNewPassword} handler={handleInput} />

                <FormButton label='Save' />
            </Form>

            <p className='deleteUserLink' onClick={() => props.authView('delete')}><i className='fas fa-user-xmark'></i> Delete Account</p>

        </div>
    )

}