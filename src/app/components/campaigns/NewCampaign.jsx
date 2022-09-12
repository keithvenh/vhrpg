import { Component } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';

class NewCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            private: false,
            errors: null,
            startDate: '',
            open: true,
            gameMaster: props.user
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

                    <div className='formFieldContainer gm'>

                        <div className='iconBox'><p><i className='fas fa-at'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Game Master</p>
                            <select name="gm" id="gm" className='gm' value={this.state.gameMaster} onChange={this.handleInput} >
                                <option value={this.props.user}>{this.props.user.email}</option>
                            </select>
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