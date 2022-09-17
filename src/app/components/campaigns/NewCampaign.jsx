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


export default function NewCampaign(props) {

// ===== UserContext for Creator profile ===== //
    const context = useContext(UserContext);

// ===== Catch Errors for Form ===== //
    const [errors, setErrors] = useState([]);

// ===== Use form for controlled inputs ===== //
    const [form,setForm] = useState({
        creator: context.profile,
        title: '',
        userGM: true,
        addGM: false,
        gameMaster: props.profile,
        maxPlayers: 4,
        players: [],
        isOpen: true,
        isPrivate: false,
        startDate: '',
        endDate: '',
        meetingDetails: '',
        playerGeneratedPCs: true,
        obligation: true,
        duty: false,
        morality: false,
        characterCreationRules: '',
        pcApprovalRequired: true,
        otherNotes: ''
    })

// ===== Form Options ===== //
    const userGMOptions = [
        {id: 'userGMYes', value: true, label: "Yes"},
        {id: 'userGMNo', value: false, label: "No"}
    ]

// ===== Manage User Input on Forms ===== //
    function handleInput(event) {
        // Setup list of checkboxes
        const checkboxes = ['obligation', 'duty', 'morality'];

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
        // const value = e.target.value
        // const field = e.target.getAttribute('statename');

        // if(e.target.id === 'userGMYes') {
        //     const updatedForm = { ...form, userGM: true, gameMaster: props.profile, players: []}
        //     setForm(updatedForm);
        // } else if(e.target.id === 'userGMNo') {
        //     const updatedForm = { ...form, userGM: false, gameMaster: '', players: [props.profile]}
        //     setForm(updatedForm);
        // } else {
        //     const updatedForm = { ...form, [field]: value }
        //     setForm(updatedForm);
        // }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        await addDoc(collection(db, 'campaigns'), {
                creator: form.creator,
                title: form.title,
                gameMaster: form.gameMaster,
                maxPlayers: form.maxPlayers,
                players: form.players,
                open: form.isOpen,
                private: form.isPrivate,
                startDate: form.startDate,
                endDate: form.endDate,
                meetingDetails: form.meetingDetails,
                playerGeneratedPCs: form.playerGeneratedPCs,
                obligation: form.obligation,
                duty: form.duty,
                morality: form.morality,
                characterCreationRules: form.characterCreationRules,
                pcApprovalRequired: form.pcApprovalRequired,
                otherNotes: form.otherNotes
            }).then(function(result) {
                props.changeView(<Campaigns changeView={props.changeView} />);
            }).catch((e) => {
                alert("An Error Has Occured");
                console.log(e)})
    }
    
    return (
        <div className='NewCampaign'>
            <Form title='New Campaign' handler={handleSubmit} >
                <FormErrors errors={errors} />

                <FormInput name='title' type='text' label='Campaign Title' value={form.title} handler={handleInput} autoFocus={true} />

                <FormRadio name='userGM' label='Will you be the GM?' options={userGMOptions} value={form.userGM} handler={handleInput} />

                <FormInput name='maxPlayers' type='number' label='Maximum Number of Players' value={form.maxPlayers} handler={handleInput} />

                <div className='formFieldContainer open'>

                    <div className='iconBox'><p><i className='fas fa-user-lock'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Open Campaign</p>
                        <fieldset className='radioContainer'>
                            <div className='radioSelect'>
                                <input
                                    name='isOpen'
                                    id='open'
                                    className="input radioInput isOpen"
                                    type="radio"
                                    value={true}
                                    onChange={handleInput}
                                    checked={form.isOpen}
                                />
                                <label className='label' htmlFor='open'>Open</label>
                            </div>
                            <div className='radioSelect'>
                                <input
                                    name='isOpen'
                                    id='closed'
                                    className="input radioInput isOpen"
                                    type="radio"
                                    value={false}
                                    onChange={handleInput}
                                    checked={!form.isOpen}
                                />
                                <label className='label' htmlFor='closed'>Closed</label>
                            </div>
                        </fieldset>
                    </div>
                </div>

                <div className='formFieldContainer private'>

                    <div className='iconBox'><p><i className='fas fa-eye-slash'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Private Campaign</p>
                            <fieldset className='radioContainer'>
                                <div className='radioSelect'>
                                    <input
                                        name='isPrivate'
                                        id='private'
                                        className="input radioInput isPrivate"
                                        type="radio"
                                        value={true}
                                        onChange={handleInput}
                                        checked={form.isPrivate}
                                    />
                                    <label className='label' htmlFor='private'>Private</label>
                                </div>
                                <div className='radioSelect'>
                                    <input
                                        name='isPrivate'
                                        id='public'
                                        className="input radioInput isPrivate"
                                        type="radio"
                                        value={false}
                                        onChange={handleInput}
                                        checked={!form.isPrivate}
                                    />
                                    <label className='label' htmlFor='public'>Public</label>
                                </div>
                            </fieldset>
                    </div>

                </div>

                <FormInput name='startDate' type='date' label='Start Date' value={form.startDate} handler={handleInput} />

                <div className='formFieldContainer meetingDetails'>

                    <div className='iconBox'><p><i className='fas fa-info'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Campaign Meeting Details</p>
                        <textarea
                            id='meetingDetails'
                            name='meetingDetails'
                            className="input textfieldInput meetingDetails"
                            type="textField"
                            value={form.meetingDetails}
                            onChange={handleInput}
                            placeholder="Include details such as frequency, location, start time and end time"
                        />
                    </div>

                </div>

                <div className='formFieldContainer pcCreation'>

                    <div className='iconBox'><p><i className='fas fa-lightbulb'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Players Create their own PCs?</p>
                            <fieldset className='radioContainer'>
                                <div className='radioSelect'>
                                    <input
                                        name='playerGeneratedPCs'
                                        id='pcCreationYes'
                                        className="input radioInput playerGeneradedPCs"
                                        type="radio"
                                        value={true}
                                        onChange={handleInput}
                                        checked={form.playerGeneratedPCs}
                                    />
                                    <label className='label' htmlFor='pcCreationYes'>Yes</label>
                                </div>
                                <div className='radioSelect'>
                                    <input
                                        name='playerGeneratedPCs'
                                        id='pcCreationNo'
                                        className="input radioInput playerGeneradedPCs"
                                        type="radio"
                                        value={false}
                                        onChange={handleInput}
                                        checked={!form.playerGeneratedPCs}
                                    />
                                    <label className='label' htmlFor='pcCreationNo'>No</label>
                                </div>
                            </fieldset>
                    </div>

                </div>

                <div className='formFieldContainer gmApproval'>

                    <div className='iconBox'><p><i className='fas fa-check'></i></p></div>
                    <div className='formField'>
                        <p className='label'>PCs require GM Approval?</p>
                        <fieldset className='radioContainer'>
                            <div className='radioSelect'>
                                <input
                                    name='pcApprovalRequired'
                                    id='gmApprovalYes'
                                    className="input radioInput gmApprovalGroup"
                                    type="radio"
                                    value={true}
                                    onChange={handleInput}
                                    checked={form.pcApprovalRequired}
                                />
                                <label className='label' htmlFor='gmApprovalYes'>Yes</label>
                            </div>
                            <div className='radioSelect'>
                                <input
                                    name='pcApprovalRequired'
                                    id='gmApprovalNo'
                                    className="input radioInput gmApprovalGroup"
                                    type="radio"
                                    value={false}
                                    onChange={handleInput}
                                    checked={!form.pcApprovalRequired}
                                />
                                <label className='label' htmlFor='gmApprovalNo'>No</label>
                            </div>
                        </fieldset>
                    </div>

                </div>

                <div className='formFieldContainer obligations'>
                    <div className='iconBox'><p><i className='fas fa-wrench'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Game Mechanics</p>
                            <fieldset className='checkboxContainer'>
                                <div className='checkboxSelect'>
                                    <input
                                        name='gameMechanics'
                                        id='obligation'
                                        className="input checkboxInput gameMechanics"
                                        type="checkbox"
                                        value={'obligation'}
                                        onChange={handleInput}
                                        checked={form.obligation}
                                    />
                                    <label className='label' htmlFor='obligation'>Obligation</label>
                                </div>
                                <div className='checkboxSelect'>
                                    <input
                                        name='gameMechanics'
                                        id='duty'
                                        className="input checkboxInput gameMechanics"
                                        type="checkbox"
                                        value={"duty"}
                                        onChange={handleInput}
                                        checked={form.duty}
                                    />
                                    <label className='label' htmlFor='duty'>Duty</label>
                                </div>
                                <div className='checkboxSelect'>
                                    <input
                                        name='gameMechanics'
                                        id='morality'
                                        className="input checkboxInput gameMechanics"
                                        type="checkbox"
                                        value={"morality"}
                                        onChange={handleInput}
                                        checked={form.morality}
                                    />
                                    <label className='label' htmlFor='morality'>Morality</label>
                                </div>
                            </fieldset>
                    </div>

                </div>


                <div className='formFieldContainer characterCreationRules'>
                    <div className='iconBox'><p><i className='fas fa-clipboard-list'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Other Character Creation Rules</p>
                        <textarea
                            id='characterCreationRules'
                            className="input textfieldInput characterCreationRules"
                            type="textField"
                            value={form.characterCreationRules}
                            onChange={handleInput}
                            placeholder="Include things like Knight-Level player for example."
                        />
                    </div>
                </div>

                <div className='formFieldContainer otherNotes'>
                    <div className='iconBox'><p><i className='fas fa-info-circle'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Other Relevant Information</p>
                        <textarea
                            id='otherNotes'
                            className="input textfieldInput otherNotes"
                            type="textField"
                            value={form.otherNotes}
                            onChange={handleInput}
                            placeholder="Include things like language or age restrictions for example."
                        />
                    </div>

                </div>

                <FormButton value='Create Campaign' />

            </Form>

        </div>
    )
}