import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { db } from '../../../db/application/db';
import { doc, getDoc } from 'firebase/firestore';
import Form from '../forms/Form';
import FormErrors from '../forms/FormErrors';
import FormInput from '../forms/FormInput';
import FormButton from '../forms/FormButton';
import UserProfile from './UserProfile';

export default function FindFriend(props) {

    const context = useContext(UserContext);

    const [form, setForm] = useState({uid: ''})
    const [errors, setErrors] = useState([])
    const [friend, setFriend] = useState();

    function handleInput(event) {
        setForm({...form, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event) {
        event.preventDefault();

        getDoc(doc(db, 'users', form.uid)).then((result) => {
            result.exists()
            ? setFriend(result.data())
            : setErrors(["User Not Found.", <br/>, "Please check the User ID and try again."])
        }).catch((error) => {
            console.log(error);
            setErrors(["User Not Found. Please check the User ID and try again."])
        })
    }

    return (

        <div className='FindFiend'>

            <Form title='Find Friend By ID' handler={handleSubmit}>

                <FormErrors errors={errors}/>

                <FormInput 
                    name='uid'
                    type='text'
                    labale='User ID'
                    value={form.uid}
                    handler={handleInput}
                    autoFocus={true}
                />

                <FormButton label='Find Friend' />

            </Form>

            {friend ? (

                <UserProfile profile={friend} />

            ) : ''}

        </div>
    )
}