import React, { useState, useContext } from 'react';
import {UserContext} from '../../contexts/userContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import Form from '../forms/Form';
import FormErrors from '../forms/FormErrors';
import FormInput from '../forms/FormInput';
import FormButton from '../forms/FormButton';
import FormRadio from '../forms/FormRadio';
import FormCheckbox from '../forms/FormCheckbox';
import FormTextarea from '../forms/FormTextarea';

export default function NewCampaign(props) {

// ===== UserContext for Creator profile ===== //
    const context = useContext(UserContext);

// ===== Catch Errors for Form ===== //
    const [errors, setErrors] = useState([]);

// ===== Use form for controlled inputs ===== //
    const [form, setForm] = useState({
        title: '',
        startDate: '',
        maxPlayers: 4,
        gameMaster: true,
        isOpen: true,
        isPrivate: false,
        obligation: false,
        duty: false,
        morality: false,
        meetingDetails: '',
        characterCreationRules: '',
        otherNotes: ''
    })

// ===== Form Options ===== //
    const radioOptions = {
        userGM: [
            {id: 'userGMYes', value: true, label: "Yes"},
            {id: 'userGMNo', value: false, label: "No"}
        ],
        isOpen: [
            {id: 'open', value: true, label: "Open"},
            {id: 'closed', value: false, label: "Closed"}
        ],
        isPrivate: [
            {id: 'public', value: false, label: "Public"},
            {id: 'private', value: true, label: "Private" }
        ],
        gameMechanics: [
            {id: 'obligation', value: 'Obligation', label: 'Obligation'},
            {id: 'duty', value: 'Duty', label: 'Duty'},
            {id: 'morality', value: 'Morality', label: 'Morality'}
        ]

    }

// ===== Manage User Input on Forms ===== //
    function handleInput(event) {
        if(event.target.type === 'checkbox') {
            setForm({...form, [event.target.id]: event.target.checked});
        } else if(event.target.type === 'radio') {
            setForm({...form, [event.target.name]: event.target.value === 'true'})
        } else {
            setForm({...form, [event.target.name]: event.target.value})
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        await addDoc(collection(db, 'campaigns'), {
                ...form,
                creator: context.profile.public,
                endDate: '',
                gameMaster: form.gameMaster ? context.profile.public : '',
                players: !form.gameMaster ? [context.profile.public] : []
            }).then(function(result) {
                props.campaignsView('show', result.id);
            }).catch((e) => {
                alert("An Error Has Occured");
                console.log(e)})
    }
    
    return (
        <div className='NewCampaign'>
            <Form title='New Campaign' handler={handleSubmit} >

                <FormErrors errors={errors} />

                <FormInput 
                    name='title' 
                    type='text' 
                    label='Campaign Title' 
                    value={form.title} 
                    handler={handleInput} 
                    autoFocus={true} 
                />

                <FormInput 
                    name='startDate' 
                    type='date' 
                    label='Start Date' 
                    value={form.startDate} 
                    handler={handleInput} 
                />

                <FormInput 
                    name='maxPlayers' 
                    type='number' 
                    label='Maximum Number of Players' 
                    value={form.maxPlayers} 
                    handler={handleInput} 
                />

                <FormRadio 
                    name='gameMaster' 
                    label='Will you be the GM?' 
                    options={radioOptions.userGM} 
                    value={form.gameMaster} 
                    handler={handleInput} 
                />

                <FormRadio 
                    name='isOpen' 
                    label='Campaign Open to Join' 
                    options={radioOptions.isOpen} 
                    value={form.isOpen} 
                    handler={handleInput} 
                />

                <FormRadio 
                    name='isPrivate' 
                    label='Campaign Privacy' 
                    options={radioOptions.isPrivate} 
                    value={form.isPrivate} 
                    handler={handleInput} 
                />

                <FormCheckbox 
                    name='gameMechanics' 
                    label='Game Mechanics' 
                    options={radioOptions.gameMechanics} 
                    handler={handleInput} 
                />

                <FormTextarea 
                    name='meetingDetails' 
                    label='Campaign Meeting Details' 
                    value={form.meetingDetails} 
                    handler={handleInput} 
                    placeholder="Include details such as frequency, location, start time and end time" 
                />
                
                <FormTextarea 
                    name='characterCreationRules' 
                    label='Character Creation Ruls' 
                    value={form.characterCreationRules} 
                    handler={handleInput}
                    placeholder="Include things like Knight-Level player for example."
                />

                <FormTextarea
                    name='otherNotes'
                    label="Other Notes"
                    value={form.otherNotes}
                    handler={handleInput}
                    placeholder="Include things like language or age restrictions for example."
                />

                <FormButton value='Create Campaign' />

            </Form>

        </div>
    )
}