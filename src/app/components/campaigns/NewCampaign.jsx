import React, { useState, useContext } from 'react';
import {UserContext} from '../../contexts/userContext';
import { Component } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import Campaigns from './Campaigns'
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
        creator: context.profile,
        title: '',
        startDate: '',
        maxPlayers: 4,
        userGM: true,
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
        // Setup list of checkboxes
        const checkboxes = ['Obligation', 'Duty', 'Morality'];

        // Setup Value for form submission
        let value;

        // If value is true or false, return boolean instead of string
        event.target.value === 'true' ? value = true : event.target.value === 'false' ? value = false : value = event.target.value;

        // If target is a checkbox
        if(checkboxes.includes(event.target.value)) {
            // If target is a checkbox use value for field name and flip the boolean for the value
            value = setForm({...form, [event.target.value]: !form[event.target.value]})
        } else {
            // If target is not a checkbox, set the field using name and value
            setForm({...form, [event.target.name]: value});
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        await addDoc(collection(db, 'campaigns'), {
                creator: context.profile,
                title: form.title,
                startDate: form.startDate,
                endDate: '',
                maxPlayers: form.maxPlayers,
                gameMaster: form.userGM ? context.profile : '',
                players: !form.userGM ? [context.profile] : [],
                open: form.isOpen,
                private: form.isPrivate,
                obligation: form.obligation,
                duty: form.duty,
                morality: form.morality,
                meetingDetails: form.meetingDetails,
                characterCreationRules: form.characterCreationRules,
                otherNotes: form.otherNotes
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
                    name='userGM' 
                    label='Will you be the GM?' 
                    options={radioOptions.userGM} 
                    value={form.userGM} 
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