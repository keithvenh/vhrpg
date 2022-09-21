
import React, { useState, useContext } from 'react';
import {UserContext} from '../../contexts/userContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import Form from '../forms/Form';
import FormErrors from '../forms/FormErrors';
import FormInput from '../forms/FormInput';
import FormButton from '../forms/FormButton';
import FormRadio from '../forms/FormRadio';
import FormCheckbox from '../forms/FormCheckbox';
import FormTextarea from '../forms/FormTextarea';

export default function EditCampaign(props) {

// ===== UserContext for Creator profile ===== //
    const context = useContext(UserContext);

// ===== Catch Errors for Form ===== //
    const [errors, setErrors] = useState([]);

// ===== Use form for controlled inputs ===== //
    const [form, setForm] = useState({
        title: props.campaign.title,
        startDate: props.campaign.startDate,
        maxPlayers: props.campaign.maxPlayers,
        gameMaster: props.campaign.gameMaster !== '',
        isOpen: props.campaign.isOpen,
        isPrivate: props.campaign.isPrivate,
        meetingDetails: props.campaign.meetingDetails,
        characterCreationRules: props.campaign.characterCreationRules,
        otherNotes: props.campaign.otherNotes,
        gameMechanics: props.campaign.gameMechanics
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
            // If the value is already in the array, remove it
            if(form[event.target.name].includes(event.target.value)) {
                setForm({
                    ...form, 
                    [event.target.name]: form[event.target.name].filter((value) => {
                        return value !== event.target.value;
                    })
                })
            } else {
                // if value is not in the array, add it
                setForm({
                    ...form,
                    [event.target.name]: [...form[event.target.name], event.target.value]
                })
            }
        } else if(event.target.type === 'radio') {
            setForm({...form, [event.target.name]: event.target.value === 'true'})
        } else {
            setForm({...form, [event.target.name]: event.target.value})
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        updateDoc(doc(db, 'campaigns', props.campaign.id), {
            ...form,
            gameMaster: form.gameMaster ? context.profile.public : ''
        }).then(() => {
            props.campaignView('show', props.campaign);
        })
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
                    checked={form.gameMechanics}
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