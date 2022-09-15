import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import Campaigns from './Campaigns'


export default function NewCampaign(props) {

    const [form,setForm] = useState({
        creator: props.profile,
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
        otherNotes: '',
        errors: null
    })

    
    // function handleInput(e) {

    //     const value = e.target.value;

    //     switch(e.target.id) {
    //         case 'title':
    //             this.setState({title: value});
    //             break;
    //         case 'userGMYes':
    //             this.setState({userGM: true, gameMaster: profile, players: []});
    //             break;
    //         case 'userGMNo':
    //             this.setState({userGM: false, gameMaster: '', players: [profile]});
    //             break;
    //         case 'addGMYes':
    //             this.setState({addGM: true});
    //             break;
    //         case 'addGMNo':
    //             this.setState({addGM: false});
    //             break;
    //         case 'maxPlayers':
    //             this.setState({maxPlayers: value});
    //             break;
    //         case 'open':
    //             this.setState({isOpen: true});
    //             break;
    //         case 'closed':
    //             this.setState({isOpen: false});
    //             break;
    //         case 'private':
    //             this.setState({isPrivate: true});
    //             break;
    //         case 'public':
    //             this.setState({isPrivate: false});
    //             break;
    //         case 'startDate':
    //             this.setState({startDate: value});
    //             break;
    //         case 'endDate':
    //             this.setState({endDate: value});
    //             break;
    //         case 'meetingDetails':
    //             this.setState({meetingDetails: value});
    //             break;
    //         case 'pcCreationYes':
    //             this.setState({playerGeneratedPCs: true});
    //             break;
    //         case 'pcCreationNo':
    //             this.setState({playerGeneratedPCs: false});
    //             break;
    //         case 'gmApprovalYes':
    //             this.setState({pcApprovalRequired: true});
    //             break;
    //         case 'gmApprovalNo':
    //             this.setState({pcApprovalRequired: false});
    //             break;
    //         case 'obligation':
    //             this.setState({obligation: !obligation})
    //             break;
    //         case 'duty':
    //             this.setState({duty: !duty})
    //             break;
    //         case 'morality':
    //             this.setState({morality: !morality})
    //             break;
    //         case 'characterCreationRules':
    //             this.setState({characterCreationRules: value});
    //             break;
    //         case 'otherNotes':
    //             this.setState({otherNotes: value});
    //             break;
    //         default:
    //             console.log('Error ' + e.target.id + ' does not exist');

    //     }
    // }

    function handleInput(e) {
        const value = e.target.value
        const field = e.target.getAttribute('statename');

        if(e.target.id === 'userGMYes') {
            const updatedForm = { ...form, userGM: true, gameMaster: props.profile, players: []}
            setForm(updatedForm);
        } else if(e.target.id === 'userGMNo') {
            const updatedForm = { ...form, userGM: false, gameMaster: '', players: [props.profile]}
            setForm(updatedForm);
        } else {
            const updatedForm = { ...form, [field]: value }
            setForm(updatedForm);
        }
    }
    console.log(form)

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
            <div className='formTitle'>
                <p className='title'>New Campaign</p>
                <p className='subtitle sw'>New Campaign</p>
            </div>
            <form className='signupForm' onSubmit={handleSubmit}>
                <div className='formField'>
                    <p className='errors'>{form.errors}</p>
                </div>

                <div className='formFieldContainer title'>

                    <div className='iconBox'><p><i className='fas fa-t'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Campaign Title</p>
                        <input 
                            id='title'
                            statename='title'
                            className="title"
                            type="text"
                            value={form.title}
                            onChange={handleInput}
                            autoFocus
                        />
                    </div>

                </div>

                <div className='formFieldContainer userGM'>

                    <div className='iconBox'><p><i className='fas fa-crown'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Will you be the GM?</p>
                        <fieldset className='radioContainer'>
                            <div className='radioSelect'>
                                <input 
                                    name='userGMGroup'
                                    statename='userGM'
                                    id='userGMYes'
                                    className="userGMGroup"
                                    type="radio"
                                    value={true}
                                    onChange={handleInput}
                                    checked={form.userGM}
                                />
                                <label className='label' htmlFor='userGMYes'>Yes</label>
                            </div>
                            <div className='radioSelect'>
                                <input 
                                    name='userGMGroup'
                                    statename='userGM'
                                    id='userGMNo'
                                    className="userGMGroup"
                                    type="radio"
                                    value={false}
                                    onChange={handleInput}
                                    checked={!form.userGM}
                                />
                                <label className='label' htmlFor='userGMNo'>No</label>
                            </div>
                        </fieldset>
                    </div>

                </div>

                <div className='formFieldContainer maxPlayers'>
                    
                    <div className='iconBox'><p><i className='fas fa-plus-minus'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Maximum Number of Players</p>
                        <input 
                            id='maxPlayers'
                            statename='maxPlayers'
                            className="maxPlayers"
                            type="number"
                            value={form.maxPlayers}
                            onChange={handleInput}
                        />
                    </div>

                </div>

                <div className='formFieldContainer open'>

                    <div className='iconBox'><p><i className='fas fa-user-lock'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Open Campaign</p>
                        <fieldset className='radioContainer'>
                            <div className='radioSelect'>
                                <input
                                    name='openGroup'
                                    statename='isOpen'
                                    id='open'
                                    className="openGroup"
                                    type="radio"
                                    value={true}
                                    onChange={handleInput}
                                    checked={form.isOpen}
                                />
                                <label className='label' htmlFor='open'>Open</label>
                            </div>
                            <div className='radioSelect'>
                                <input
                                    name='openGroup'
                                    statename='isOpen'
                                    id='closed'
                                    className="openGroup"
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
                                        name='privateGroup'
                                        statename='isPrivate'
                                        id='private'
                                        className="privateGroup"
                                        type="radio"
                                        value={true}
                                        onChange={handleInput}
                                        checked={form.isPrivate}
                                    />
                                    <label className='label' htmlFor='private'>Private</label>
                                </div>
                                <div className='radioSelect'>
                                    <input
                                        name='privateGroup'
                                        statename='isPrivate'
                                        id='public'
                                        className="privateGroup"
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

                <div className='formFieldContainer startDate'>

                    <div className='iconBox'><p><i className='fa-regular fa-calendar-days'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Start Date</p>
                        <input
                            id='startDate'
                            statename='startDate'
                            className="startDate"
                            type="date"
                            value={form.startDate}
                            onChange={handleInput}
                        />
                    </div>

                </div>

                <div className='formFieldContainer endDate'>

                    <div className='iconBox'><p><i className='fas fa-calendar-days'></i></p></div>
                    <div className='formField'>
                        <p className='label'>End Date</p>
                        <input
                            id='endDate'
                            statename='endDate'
                            className="endDate"
                            type="date"
                            value={form.endDate}
                            onChange={handleInput}
                        />
                    </div>

                </div>

                <div className='formFieldContainer meetingDetails'>

                    <div className='iconBox'><p><i className='fas fa-info'></i></p></div>
                    <div className='formField'>
                        <p className='label'>Campaign Meeting Details</p>
                        <textarea
                            id='meetingDetails'
                            statename='meetingDetails'
                            className="meetingDetails"
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
                                        name='pcCreationGroup'
                                        statename='playerGeneratedPCs'
                                        id='gmApprovalYes'
                                        className="pcCreationGroup"
                                        type="radio"
                                        value={true}
                                        onChange={handleInput}
                                        checked={form.playerGeneratedPCs}
                                    />
                                    <label className='label' htmlFor='pcCreationYes'>Yes</label>
                                </div>
                                <div className='radioSelect'>
                                    <input
                                        name='pcCreationGroup'
                                        statename='playerGeneratedPCs'
                                        id='pcCreationNo'
                                        className="pcCreationGroup"
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
                                    name='gmApprovalGroup'
                                    statename='pcApprovalRequired'
                                    id='gmApprovalYes'
                                    className="gmApprovalGroup"
                                    type="radio"
                                    value={true}
                                    onChange={handleInput}
                                    checked={form.pcApprovalRequired}
                                />
                                <label className='label' htmlFor='gmApprovalYes'>Yes</label>
                            </div>
                            <div className='radioSelect'>
                                <input
                                    name='gmApprovalGroup'
                                    statename='pcApprovalRequired'
                                    id='gmApprovalNo'
                                    className="gmApprovalGroup"
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
                                        name='obligationGroup'
                                        statename='obligation'
                                        id='obligation'
                                        className="obligationGroup"
                                        type="checkbox"
                                        value={'Obligation'}
                                        onChange={handleInput}
                                        checked={form.obligation}
                                    />
                                    <label className='label' htmlFor='obligation'>Obligation</label>
                                </div>
                                <div className='checkboxSelect'>
                                    <input
                                        name='obligationGroup'
                                        statename='duty'
                                        id='duty'
                                        className="obligationGroup"
                                        type="checkbox"
                                        value={"Duty"}
                                        onChange={handleInput}
                                        checked={form.duty}
                                    />
                                    <label className='label' htmlFor='duty'>Duty</label>
                                </div>
                                <div className='checkboxSelect'>
                                    <input
                                        name='obligationGroup'
                                        statename='morality'
                                        id='morality'
                                        className="obligationGroup"
                                        type="checkbox"
                                        value={"Morality"}
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
                            statename='characterCreationRules'
                            className="characterCreationRules"
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
                            statename='otherNotes'
                            className="otherNotes"
                            type="textField"
                            value={form.otherNotes}
                            onChange={handleInput}
                            placeholder="Include things like language or age restrictions for example."
                        />
                    </div>

                </div>

                <div className='formFieldContainer button'>
                    <button type='submit' id='submit' className='button submit' onClick={handleSubmit}>Submit</button>
                </div>

            </form>
        </div>
    )
}
// class NewCampaign1 extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             creator: this.props.profile,
//             title: '',
//             userGM: true,
//             addGM: false,
//             gameMaster: this.props.profile,
//             maxPlayers: 4,
//             players: [],
//             open: true,
//             private: false,
//             startDate: '',
//             endDate: '',
//             meetingDetails: '',
//             playerGeneratedPCs: true,
//             obligation: true,
//             duty: false,
//             morality: false,
//             characterCreationRules: '',
//             pcApprovalRequired: true,
//             otherNotes: '',         
//             errors: null
//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleInput = this.handleInput.bind(this);
//     }

//     handleInput(e) {

//         const value = e.target.value;

//         switch(e.target.id) {
//             case 'title':
//                 this.setState({title: value});
//                 break;
//             case 'userGMYes':
//                 this.setState({userGM: true, gameMaster: this.props.profile, players: []});
//                 break;
//             case 'userGMNo':
//                 this.setState({userGM: false, gameMaster: '', players: [this.props.profile]});
//                 break;
//             case 'addGMYes':
//                 this.setState({addGM: true});
//                 break;
//             case 'addGMNo':
//                 this.setState({addGM: false});
//                 break;
//             case 'maxPlayers':
//                 this.setState({maxPlayers: value});
//                 break;
//             case 'open':
//                 this.setState({open: true});
//                 break;
//             case 'closed':
//                 this.setState({open: false});
//                 break;
//             case 'private':
//                 this.setState({private: true});
//                 break;
//             case 'public':
//                 this.setState({private: false});
//                 break;
//             case 'startDate':
//                 this.setState({startDate: value});
//                 break;
//             case 'endDate':
//                 this.setState({endDate: value});
//                 break;
//             case 'meetingDetails':
//                 this.setState({meetingDetails: value});
//                 break;
//             case 'pcCreationYes':
//                 this.setState({playerGeneratedPCs: true});
//                 break;
//             case 'pcCreationNo':
//                 this.setState({playerGeneratedPCs: false});
//                 break;
//             case 'gmApprovalYes':
//                 this.setState({pcApprovalRequired: true});
//                 break;
//             case 'gmApprovalNo':
//                 this.setState({pcApprovalRequired: false});
//                 break;
//             case 'obligation':
//                 this.setState({obligation: !this.state.obligation})
//                 break;
//             case 'duty':
//                 this.setState({duty: !this.state.duty})
//                 break;
//             case 'morality':
//                 this.setState({morality: !this.state.morality})
//                 break;
//             case 'characterCreationRules':
//                 this.setState({characterCreationRules: value});
//                 break;
//             case 'otherNotes':
//                 this.setState({otherNotes: value});
//                 break;
//             default:
//                 console.log('Error ' + e.target.id + ' does not exist');

//         }
//     }

//     async handleSubmit(event) {
//         event.preventDefault();

//         await addDoc(collection(db, 'campaigns'), {
//                 creator: this.state.creator,
//                 title: this.state.title,
//                 gameMaster: this.state.gameMaster,
//                 maxPlayers: this.state.maxPlayers,
//                 players: this.state.players,
//                 open: this.state.open,
//                 private: this.state.private,
//                 startDate: this.state.startDate,
//                 endDate: this.state.endDate,
//                 meetingDetails: this.state.meetingDetails,
//                 playerGeneratedPCs: this.state.playerGeneratedPCs,
//                 obligation: this.state.obligation,
//                 duty: this.state.duty,
//                 morality: this.state.morality,
//                 characterCreationRules: this.state.characterCreationRules,
//                 pcApprovalRequired: this.state.pcApprovalRequired,
//                 otherNotes: this.state.otherNotes
//             }).then(function(result) {
//                 this.props.changeView('campaigns');
//             }).catch((e) => {
//                 alert("An Error Has Occured");
//                 console.log(e)})
//     }

//     render() {

//         return (
//             <div className='NewCampaign'>
//                 <div className='formTitle'>
//                     <p className='title'>New Campaign</p>
//                     <p className='subtitle sw'>New Campaign</p>
//                 </div>
//                 <form className='signupForm' onSubmit={this.handleSubmit}>
//                     <div className='formField'>
//                         <p className='errors'>{this.state.errors}</p>
//                     </div>
    
//                     <div className='formFieldContainer title'>
    
//                         <div className='iconBox'><p><i className='fas fa-t'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>Campaign Title</p>
//                             <input id='title' className="title" type="text" value={this.state.title} onChange={this.handleInput} autoFocus/>
//                         </div>
    
//                     </div>

//                     <div className='formFieldContainer userGM'>

//                         <div className='iconBox'><p><i className='fas fa-crown'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>Will you be the GM?</p>
//                             <fieldset className='radioContainer'>
//                                 <div className='radioSelect'>
//                                     <input name='userGMGroup' id='userGMYes' className="userGMGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.userGM}/>
//                                     <label className='label' htmlFor='userGMYes'>Yes</label>
//                                 </div>
//                                 <div className='radioSelect'>
//                                     <input name='userGMGroup' id='userGMNo' className="userGMGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.userGM}/>
//                                     <label className='label' htmlFor='userGMNo'>No</label>
//                                 </div>
//                             </fieldset>
//                         </div>

//                     </div>

//                     <div className='formFieldContainer maxPlayers'>
                        
//                         <div className='iconBox'><p><i className='fas fa-plus-minus'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>Maximum Number of Players</p>
//                             <input id='maxPlayers' className="maxPlayers" type="number" value={this.state.maxPlayers} onChange={this.handleInput} />
//                         </div>

//                     </div>

//                     <div className='formFieldContainer open'>

//                         <div className='iconBox'><p><i className='fas fa-user-lock'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>Open Campaign</p>
//                             <fieldset className='radioContainer'>
//                                 <div className='radioSelect'>
//                                     <input name='openGroup' id='open' className="openGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.open}/>
//                                     <label className='label' htmlFor='open'>Open</label>
//                                 </div>
//                                 <div className='radioSelect'>
//                                     <input name='openGroup' id='closed' className="openGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.open}/>
//                                     <label className='label' htmlFor='closed'>Closed</label>
//                                 </div>
//                             </fieldset>
//                         </div>
//                     </div>

//                     <div className='formFieldContainer private'>

//                         <div className='iconBox'><p><i className='fas fa-eye-slash'></i></p></div>
//                             <div className='formField'>
//                                 <p className='label'>Private Campaign</p>
//                                 <fieldset className='radioContainer'>
//                                     <div className='radioSelect'>
//                                         <input name='privateGroup' id='private' className="privateGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.private}/>
//                                         <label className='label' htmlFor='private'>Private</label>
//                                     </div>
//                                     <div className='radioSelect'>
//                                         <input name='privateGroup' id='public' className="privateGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.private}/>
//                                         <label className='label' htmlFor='public'>Public</label>
//                                     </div>
//                                 </fieldset>
//                         </div>

//                     </div>

//                     <div className='formFieldContainer startDate'>

//                         <div className='iconBox'><p><i className='fa-regular fa-calendar-days'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>Start Date</p>
//                             <input id='startDate' className="startDate" type="date" value={this.state.startDate} onChange={this.handleInput} />
//                         </div>

//                     </div>

//                     <div className='formFieldContainer endDate'>

//                         <div className='iconBox'><p><i className='fas fa-calendar-days'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>End Date</p>
//                             <input id='endDate' className="endDate" type="date" value={this.state.endDate} onChange={this.handleInput} />
//                         </div>

//                     </div>

//                     <div className='formFieldContainer meetingDetails'>
    
//                         <div className='iconBox'><p><i className='fas fa-info'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>Campaign Meeting Details</p>
//                             <textarea id='meetingDetails' className="meetingDetails" type="textField" value={this.state.meetingDetails} onChange={this.handleInput} placeholder="Include details such as frequency, location, start time and end time" />
//                         </div>
    
//                     </div>

//                     <div className='formFieldContainer pcCreation'>

//                         <div className='iconBox'><p><i className='fas fa-lightbulb'></i></p></div>
//                             <div className='formField'>
//                                 <p className='label'>Players Create their own PCs?</p>
//                                 <fieldset className='radioContainer'>
//                                     <div className='radioSelect'>
//                                         <input name='pcCreationGroup' id='gmApprovalYes' className="pcCreationGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.playerGeneratedPCs}/>
//                                         <label className='label' htmlFor='pcCreationYes'>Yes</label>
//                                     </div>
//                                     <div className='radioSelect'>
//                                         <input name='pcCreationGroup' id='pcCreationNo' className="pcCreationGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.playerGeneratedPCs}/>
//                                         <label className='label' htmlFor='pcCreationNo'>No</label>
//                                     </div>
//                                 </fieldset>
//                         </div>

//                     </div>

//                     <div className='formFieldContainer gmApproval'>

//                         <div className='iconBox'><p><i className='fas fa-check'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>PCs require GM Approval?</p>
//                             <fieldset className='radioContainer'>
//                                 <div className='radioSelect'>
//                                     <input name='gmApprovalGroup' id='gmApprovalYes' className="gmApprovalGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.pcApprovalRequired}/>
//                                     <label className='label' htmlFor='gmApprovalYes'>Yes</label>
//                                 </div>
//                                 <div className='radioSelect'>
//                                     <input name='gmApprovalGroup' id='gmApprovalNo' className="gmApprovalGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.pcApprovalRequired}/>
//                                     <label className='label' htmlFor='gmApprovalNo'>No</label>
//                                 </div>
//                             </fieldset>
//                         </div>

//                     </div>

//                     <div className='formFieldContainer obligations'>
//                         <div className='iconBox'><p><i className='fas fa-wrench'></i></p></div>
//                             <div className='formField'>
//                                 <p className='label'>Game Mechanics</p>
//                                 <fieldset className='checkboxContainer'>
//                                     <div className='checkboxSelect'>
//                                         <input name='obligationGroup' id='obligation' className="obligationGroup" type="checkbox" value={'Obligation'} onChange={this.handleInput} checked={this.state.obligation}/>
//                                         <label className='label' htmlFor='obligation'>Obligation</label>
//                                     </div>
//                                     <div className='checkboxSelect'>
//                                         <input name='obligationGroup' id='duty' className="obligationGroup" type="checkbox" value={"Duty"} onChange={this.handleInput} checked={this.state.duty}/>
//                                         <label className='label' htmlFor='duty'>Duty</label>
//                                     </div>
//                                     <div className='checkboxSelect'>
//                                         <input name='obligationGroup' id='morality' className="obligationGroup" type="checkbox" value={"Morality"} onChange={this.handleInput} checked={this.state.morality}/>
//                                         <label className='label' htmlFor='morality'>Morality</label>
//                                     </div>
//                                 </fieldset>
//                         </div>

//                     </div>


//                     <div className='formFieldContainer characterCreationRules'>
//                         <div className='iconBox'><p><i className='fas fa-clipboard-list'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>Other Character Creation Rules</p>
//                             <textarea id='characterCreationRules' className="characterCreationRules" type="textField" value={this.state.characterCreationRules} onChange={this.handleInput} placeholder="Include things like Knight-Level player for example." />
//                         </div>
    
//                     </div>

//                     <div className='formFieldContainer otherNotes'>
//                         <div className='iconBox'><p><i className='fas fa-info-circle'></i></p></div>
//                         <div className='formField'>
//                             <p className='label'>Other Relevant Information</p>
//                             <textarea id='otherNotes' className="otherNotes" type="textField" value={this.state.otherNotes} onChange={this.handleInput} placeholder="Include things like language or age restrictions for example." />
//                         </div>
    
//                     </div>

//                     <div className='formFieldContainer button'>
//                         <button type='submit' id='submit' className='button submit' onClick={this.handleSubmit}>Submit</button>
//                     </div>

//                 </form>
//             </div>
//         )
//     }
// }
