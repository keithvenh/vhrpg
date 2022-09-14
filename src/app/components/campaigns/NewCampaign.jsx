import { Component } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';

class NewCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creator: props.profile,
            title: '',
            userGM: true,
            addGM: false,
            gameMaster: props.profile,
            maxPlayers: 4,
            players: [],
            open: true,
            private: false,
            startDate: '',
            meetingDetails: '',
            playerGeneratedPCs: true,
            books: [],
            obligation: true,
            duty: false,
            morality: false,
            characterCreationRules: '',
            pcApprovalRequired: true,
            otherNotes: '',     
            questionSet: 1,       
            errors: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {

        const value = e.target.value;

        switch(e.target.id) {
            case 'title':
                this.setState({title: value});
                break;
            case 'userGMYes':
                this.setState({userGM: true, gameMaster: this.props.profile});
                break;
            case 'userGMNo':
                this.setState({userGM: false, gameMaster: ''});
                break;
            case 'addGMYes':
                this.setState({addGM: true});
                break;
            case 'addGMNo':
                this.setState({addGM: false});
                break;
            case 'maxPlayers':
                this.setState({maxPlayers: value});
                break;
            case 'open':
                this.setState({open: true});
                break;
            case 'closed':
                this.setState({open: false});
                break;
            case 'private':
                this.setState({private: true});
                break;
            case 'public':
                this.setState({private: false});
                break;
            case 'startDate':
                this.setState({startDate: value});
                break;
            case 'endDate':
                this.setState({endDate: value});
                break;
            case 'meetingDetails':
                this.setState({meetingDetails: value});
                break;
            case 'pcCreationYes':
                this.setState({playerGeneratedPCs: true});
                break;
            case 'pcCreationNo':
                this.setState({playerGeneratedPCs: false});
                break;
            case 'gmApprovalYes':
                this.setState({pcApprovalRequired: true});
                break;
            case 'gmApprovalNo':
                this.setState({pcApprovalRequired: false});
                break;
            case 'gm':
                this.setState({gameMaster: value});
                break;
            default:
                console.log('Error ' + e.target.id + ' does not exist');

        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        await addDoc(collection(db, 'campaigns'), {
                title: this.state.title,
                private: this.state.private,
                startDate: this.state.startDate,
                open: this.state.open,
                gameMaster: this.state.gameMaster.uid
            }).then(function(result) {
                return result ? alert("Campaign Created") : alert('Error');
                    //change view
            }).catch((e) => {console.log(e)})
    }

    render() {

        return (
            <div className='NewCampaign'>
                <div className='formTitle'>
                    <p className='title'>New Campaign</p>
                    <p className='subtitle sw'>New Campaign</p>
                </div>
                <form className='signupForm' onSubmit={this.handleSubmit}>
                    <div className='formField'>
                        <p className='errors'>{this.state.errors}</p>
                    </div>
    
                    <div className='formFieldContainer title'>
    
                        <div className='iconBox'><p><i className='fas fa-t'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Campaign Title</p>
                            <input id='title' className="title" type="text" value={this.state.title} onChange={this.handleInput} autoFocus/>
                        </div>
    
                    </div>

                    <div className='formFieldContainer userGM'>

                        <div className='iconBox'><p><i className='fas fa-crown'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Will you be the GM?</p>
                            <fieldset className='radioContainer'>
                                <div className='radioSelect'>
                                    <input name='userGMGroup' id='userGMYes' className="userGMGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.userGM}/>
                                    <label className='label' htmlFor='userGMYes'>Yes</label>
                                </div>
                                <div className='radioSelect'>
                                    <input name='userGMGroup' id='userGMNo' className="userGMGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.userGM}/>
                                    <label className='label' htmlFor='userGMNo'>No</label>
                                </div>
                            </fieldset>
                        </div>

                    </div>

                    {!this.state.userGM ? (
                        <div className='formFieldContainer addGM'>

                            <div className='iconBox'><p><i className='fas fa-user-plus'></i></p></div>
                            <div className='formField'>
                                <p className='label'>Add a GM Now?</p>
                                <fieldset className='radioContainer'>
                                    <div className='radioSelect'>
                                        <input name='addGMGroup' id='addGMYes' className="addGMGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.addGM}/>
                                        <label className='label' htmlFor='addGMYes'>Yes</label>
                                    </div>
                                    <div className='radioSelect'>
                                        <input name='addGMGroup' id='addGMNo' className="addGMGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.addGM}/>
                                        <label className='label' htmlFor='addGMNo'>No</label>
                                    </div>
                                </fieldset>
                            </div>

                        </div>
                    ) : (
                        ''
                    )}

                    {this.state.addGM ? (
                        <div className='formFieldContainer gm'>
                            {console.log(this.state.addGM)}
                            <div className='iconBox'><p><i className='fas fa-user-tag'></i></p></div>
                            <div className='formField'>
                                <p className='label'>Game Master</p>
                                <select name="gm" id="gm" className='gm' value={this.state.gameMaster} onChange={this.handleInput} >
                                    <option value=''></option>
                                    {/* NEED TO ADD OPTIONS OF USER FRIENDS AND USERS WITH AVAILABLETOGM: TRUE ON THEIR PROFILE AS OPTIONS */}
                                </select>
                            </div>

                        </div>
                        ) : (
                            ''
                    )}

                    <div className='formFieldContainer maxPlayers'>
                        
                        <div className='iconBox'><p><i className='fas fa-plus-minus'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Maximum Number of Players</p>
                            <input id='maxPlayers' className="maxPlayers" type="number" value={this.state.maxPlayers} onChange={this.handleInput} />
                        </div>

                    </div>

                    {this.state.players.length < this.state.maxPlayers ? (
                        <div className='playerOptions'>
                            <i className='fas fa-plus-circle'></i> Add a Player

                            {/* NEED TO ADD ABILITY TO CLICK ADD A PLAYER AND SELECT FROM LIST OF FRIENDS */}

                            <div className='formFieldContainer open'>

                            <div className='iconBox'><p><i className='fas fa-user-lock'></i></p></div>
                                <div className='formField'>
                                    <p className='label'>Open Campaign</p>
                                    <fieldset className='radioContainer'>
                                        <div className='radioSelect'>
                                            <input name='openGroup' id='open' className="openGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.open}/>
                                            <label className='label' htmlFor='open'>Open</label>
                                        </div>
                                        <div className='radioSelect'>
                                            <input name='openGroup' id='closed' className="openGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.open}/>
                                            <label className='label' htmlFor='closed'>Closed</label>
                                        </div>
                                    </fieldset>
                                </div>

                            </div>
                        </div>
                    ) : (
                        ''
                    )}

                    <div className='formFieldContainer private'>

                        <div className='iconBox'><p><i className='fas fa-eye-slash'></i></p></div>
                            <div className='formField'>
                                <p className='label'>Private Campaign</p>
                                <fieldset className='radioContainer'>
                                    <div className='radioSelect'>
                                        <input name='privateGroup' id='private' className="privateGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.private}/>
                                        <label className='label' htmlFor='private'>Private</label>
                                    </div>
                                    <div className='radioSelect'>
                                        <input name='privateGroup' id='public' className="privateGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.private}/>
                                        <label className='label' htmlFor='public'>Public</label>
                                    </div>
                                </fieldset>
                        </div>

                    </div>

                    <div className='formFieldContainer startDate'>

                        <div className='iconBox'><p><i className='fa-regular fa-calendar-days'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Start Date</p>
                            <input id='startDate' className="startDate" type="date" value={this.state.startDate} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer endDate'>

                        <div className='iconBox'><p><i className='fas fa-calendar-days'></i></p></div>
                        <div className='formField'>
                            <p className='label'>End Date</p>
                            <input id='endDate' className="endDate" type="date" value={this.state.endDate} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer meetingDetails'>
    
                        <div className='iconBox'><p><i className='fas fa-info'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Campaign Meeting Details</p>
                            <textarea id='meetingDetails' className="meetingDetails" type="textField" value={this.state.meetingDetails} onChange={this.handleInput} placeholder="Include details such as frequency, location, start time and end time" />
                        </div>
    
                    </div>

                    <div className='formFieldContainer pcCreation'>

                        <div className='iconBox'><p><i className='fas fa-lightbulb'></i></p></div>
                            <div className='formField'>
                                <p className='label'>Will Players Create their own PCs?</p>
                                <fieldset className='radioContainer'>
                                    <div className='radioSelect'>
                                        <input name='pcCreationGroup' id='gmApprovalYes' className="pcCreationGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.playerGeneratedPCs}/>
                                        <label className='label' htmlFor='pcCreationYes'>Yes</label>
                                    </div>
                                    <div className='radioSelect'>
                                        <input name='pcCreationGroup' id='pcCreationNo' className="pcCreationGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.playerGeneratedPCs}/>
                                        <label className='label' htmlFor='pcCreationNo'>No</label>
                                    </div>
                                </fieldset>
                        </div>

                    </div>

                    <div className='formFieldContainer books'>
                        {/* IDEALLY GENERATE THIS FIELD AUTOMATICALLY WITH BOOKS FROM DATABASE */}
                        {/* THIS IS NOT BEING HANDLE BY ONCHANGE OR BY STATE YET */}
                        <div className='iconBox'><p><i className='fas fa-book'></i></p></div>
                            <div className='formField'>
                                <p className='label'>What books are allowed?</p>
                                <fieldset className='checkboxContainer'>
                                    <div className='checkboxSelect'>
                                        <input name='bookGroup' id='eoteCore' className="bookGroup" type="checkbox" value={'Edge of the Empire Core Rulebook'} onChange={this.handleInput} />
                                        <label className='label' htmlFor='eoteCore'>EOTE Core</label>
                                    </div>
                                    <div className='checkboxSelect'>
                                        <input name='bookGroup' id='fndCore' className="bookGroup" type="checkbox" value={"Force and Destiny Core Rulebook"} onChange={this.handleInput} />
                                        <label className='label' htmlFor='fndCore'>FnD Core</label>
                                    </div>
                                </fieldset>
                        </div>

                    </div>

                    <div className='formFieldContainer obligations'>
                        {/* THIS IS NOT BEING HANDLE BY ONCHANGE OR BY STATE YET */}
                        <div className='iconBox'><p><i className='fas fa-wrench'></i></p></div>
                            <div className='formField'>
                                <p className='label'>What game mechanics are allowed?</p>
                                <fieldset className='checkboxContainer'>
                                    <div className='checkboxSelect'>
                                        <input name='obligationGroup' id='obligation' className="obligationGroup" type="checkbox" value={'Obligation'} onChange={this.handleInput} />
                                        <label className='label' htmlFor='obligation'>Obligation</label>
                                    </div>
                                    <div className='checkboxSelect'>
                                        <input name='obligationGroup' id='duty' className="obligationGroup" type="checkbox" value={"Duty"} onChange={this.handleInput} />
                                        <label className='label' htmlFor='duty'>Duty</label>
                                    </div>
                                    <div className='checkboxSelect'>
                                        <input name='obligationGroup' id='morality' className="obligationGroup" type="checkbox" value={"Morality"} onChange={this.handleInput} />
                                        <label className='label' htmlFor='morality'>Morality</label>
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
                                    <input name='gmApprovalGroup' id='gmApprovalYes' className="gmApprovalGroup" type="radio" value={true} onChange={this.handleInput} checked={this.state.pcApprovalRequired}/>
                                    <label className='label' htmlFor='gmApprovalYes'>Yes</label>
                                </div>
                                <div className='radioSelect'>
                                    <input name='gmApprovalGroup' id='gmApprovalNo' className="gmApprovalGroup" type="radio" value={false} onChange={this.handleInput} checked={!this.state.pcApprovalRequired}/>
                                    <label className='label' htmlFor='gmApprovalNo'>No</label>
                                </div>
                            </fieldset>
                        </div>

                    </div>

                    <div className='formFieldContainer characterCreationRules'>
                        {/* THIS IS NOT BEING HANDLE BY ONCHANGE OR BY STATE YET */}
                        <div className='iconBox'><p><i className='fas fa-clipboard-list'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Other Character Creation Rules</p>
                            <textarea id='characterCreationRules' className="characterCreationRules" type="textField" value={this.state.characterCreationRules} onChange={this.handleInput} placeholder="Include things like Knight-Level player for example." />
                        </div>
    
                    </div>

                    <div className='formFieldContainer otherNotes'>
                        {/* THIS IS NOT BEING HANDLE BY ONCHANGE OR BY STATE YET */}
                        <div className='iconBox'><p><i className='fas fa-info-circle'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Other Relevant Information</p>
                            <textarea id='otherNotes' className="otherNotes" type="textField" value={this.state.otherNotes} onChange={this.handleInput} placeholder="Include things like language or age restrictions for example." />
                        </div>
    
                    </div>

                    <div className='formFieldContainer button'>
                        <button type='submit' id='submit' className='button submit' onClick={this.handleSubmit}>Submit</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default NewCampaign;