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
            gameMaster: props.profile,
            maxPlayers: 0,
            players: [],
            open: true,
            private: false,
            startDate: '',
            meetingFrequency: '',
            meetingDays: [],
            meetingStart: null,
            meetingEnd: null,
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
        this.handleNext = this.handleNext.bind(this);
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
            case 'private':
            case 'public':
                this.setState({private: value});
                break;
            case 'startDate':
                this.setState({startDate: value});
                break;
            case 'open':
            case 'closed':
                this.setState({open: value});
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

    handleNext(event) {
        console.log(this.state.questionSet);
        let questionSet = this.state.questionSet + 1;
        console.log(questionSet);
        if(event.keyCode === 13) {
            console.log("Enter was pressed");
            this.setState({questionSet: questionSet})
        }
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

                    <div className='formFieldContainer gm'>

                        <div className='iconBox'><p><i className='fas fa-at'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Game Master</p>
                            <select name="gm" id="gm" className='gm' value={this.state.gameMaster} onChange={this.handleInput} >
                                <option value=''></option>
                                {this.state.userGM ? (
                                    <option value={this.props.profile}>{this.props.profile.username}</option>
                                ) : (
                                    <option value=''>-----</option>
                                    // NEED TO ADD A LIST OF USERS FRIENDS AS OPTIONS. ALSO, POTENTIALLY A LIST OF NON-FRIENDS THAT HAVE MARKED AVAILABLE TO GM ON THEIR PROFILE?
                                )}
                            </select>
                        </div>

                    </div>

                    <div className='formFieldContainer private'>

                        <div className='iconBox'><p><i className='fa-regular fa-address-card'></i></p></div>
                            <div className='formField'>
                                <p className='label'>Private Campaign</p>
                                <fieldset className='radioContainer'>
                                    <div className='radioSelect'>
                                        <input name='privateGroup' id='private' className="privateGroup" type="radio" value={true} onChange={this.handleInput} />
                                        <label className='label' htmlFor='private'>Private</label>
                                    </div>
                                    <div className='radioSelect'>
                                        <input name='privateGroup' id='public' className="privateGroup" type="radio" value={false} onChange={this.handleInput} />
                                        <label className='label' htmlFor='public'>Public</label>
                                    </div>
                                </fieldset>
                        </div>

                    </div>

                    <div className='formFieldContainer open'>

                        <div className='iconBox'><p><i className='fa-regular fa-address-card'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Open Campaign</p>
                            <fieldset className='radioContainer'>
                                <div className='radioSelect'>
                                    <input name='openGroup' id='open' className="openGroup" type="radio" value={true} onChange={this.handleInput} />
                                    <label className='label' htmlFor='open'>Open</label>
                                </div>
                                <div className='radioSelect'>
                                    <input name='openGroup' id='closed' className="openGroup" type="radio" value={false} onChange={this.handleInput} />
                                    <label className='label' htmlFor='closed'>Closed</label>
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

                    <div className='formFieldContainer button'>
                        <button type='submit' id='submit' className='button submit' onClick={this.handleSubmit}>Submit</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default NewCampaign;