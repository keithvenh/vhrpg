import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import createUser from '../../helpers/auth/signup';
import { validatePassword, validateEmail, checkEmptyFields } from '../../helpers/auth/formValidation';
import Form from '../forms/Form';
import FormErrors from '../forms/FormErrors';
import FormInput from '../forms/FormInput';
import FormButton from '../forms/FormButton';
import FormSelect from '../forms/FormSelect';

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

// ===== Setup Role Options for Select
    const roleOptions = [
        {value: 'Jedi Youngling', display: 'Jedi Youngling'},
        {value: 'Protocol Droid', display: 'Protocol Droid'},
        {value: 'Rebel Recruit', display: 'Rebel Recruit'},
        {value: 'Imperial Clerk', display: 'Imperial Clerk'},
        {value: 'Moisture Farmer', display: 'Moisture Farmer'}
    ]

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
                        public: {
                            username: form.username,
                            role: form.role,
                            uid: result.uid,
                        },
                        private: {
                            birthdate: form.birthdate,
                            name: form.name,
                        },
                        settings: {
                            customTheme: false
                        }
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
        <Form title='Signup' handler={handleSubmit} >

            <FormErrors errors={errors} />

            <FormInput
                name='name'
                type='name'
                label='Full Name'
                value={form.name}
                handler={handleInput}
                autoFocus={true}
            />

            <FormInput
                name='email'
                type='email'
                label='Email'
                value={form.email}
                handler={handleInput}
            />

            <FormInput
                name='username'
                type='username'
                label='Username'
                value={form.username}
                handler={handleInput}
            />

            <FormSelect
                name='role'
                label='Role'
                value={form.role}
                handler={handleInput}
                options={roleOptions}
            />

            <FormInput
                name='birthdate'
                type='date'
                label='Birthdate'
                value={form.birthdate}
                handler={handleInput}
            />

            <FormInput
                name='password'
                type='password'
                label='Password'
                value={form.password}
                handler={handleInput}
            />

            <FormInput
                name='confirmPassword'
                type='password'
                label='Confirm Password'
                value={form.confirmPassword}
                handler={handleInput}
            />

            <FormButton label='Signup' />

        </Form>
    )

}