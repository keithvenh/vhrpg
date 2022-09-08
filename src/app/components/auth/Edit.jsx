import React, {Component} from 'react';
import createUser from '../../helpers/auth/signup';
import { db } from '../../../db/application/db';
import { doc, updateDoc } from 'firebase/firestore';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.user.profile.name,
            email: props.user.user.email,
            username: props.user.profile.username,
            birthdate: props.user.profile.birthdate,
            role: props.user.profile.role,
            currentPass: '',
            newPass: '',
            confirmNewPass: '',
            errors: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {

        const value = e.target.value;

        switch(e.target.id) {
            case 'name':
                this.setState({name: value});
                break;
            case 'email':
                this.setState({email: value});
                break;
            case 'username':
                this.setState({username: value});
                break;
            case 'role': 
                this.setState({role: value});
                break;
            case 'birthdate':
                this.setState({birthdate: value});
                break;
            case 'favTeam':
                this.setState({favTeam: value});
                break;
            case 'currentPassword':
                this.setState({currentPass: value});
                break;
            case 'newPassword':
                this.setState({newPass: value});
                break;
            case 'confirmNewPassword':
                this.setState({confirmNewPass: value});
                break;
            default:
                console.log('Error ' + e.target.id + ' does not exist');

        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        //if newPassword is filled in, make sure confirmNewPassword matches, then attempt to update password
        // this will require currentPass for reauthentication (See Delete for reauthentication process)

        //if email has changed, require currentPass for reauthentication

        //update all other fields whether currentPass was given or not.

        //force non-empty fields for name, role, username, 

        if(this.state.pass === this.state.confirmPass) {

            const user = await createUser(this.state.email, this.state.pass);

            await updateDoc(doc(db, 'users', user.uid), {
                                        name: this.state.name,
                                        username: this.state.username,
                                        birthdate: this.state.birthdate,
                                        role: this.state.role
                            }).catch((e) => {console.log(e)})
            this.props.changeView('missionControl');
        } else {
            this.setState({error: "Passwords Don't Match."})
        }
    }

    render() {

        return (
            <div className='Edit'>
                <div className='formTitle'>
                    <p className='title'>Edit User</p>
                    <p className='subtitle sw'>Edit User</p>
                    <p className='userId sw'>{this.props.user.user.uid}</p>
                </div>
                <form className='editForm' onSubmit={this.handleSubmit}>
                    <div className='formField'>
                        <p className='errors'>{this.state.errors}</p>
                    </div>

                    <div className='formFieldContainer name'>

                        <div className='iconBox'><p><i className='fa-regular fa-envelope'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Full Name</p>
                            <input id='name' className="name" type="name" value={this.state.name} onChange={this.handleInput} autoFocus/>
                        </div>

                    </div>

                    <div className='formFieldContainer email'>

                        <div className='iconBox'><p><i className='fa-regular fa-address-card'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Email</p>
                            <input id='email' className="email" type="email" value={this.state.email} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer username'>

                        <div className='iconBox'><p><i className='fas fa-at'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Username</p>
                            <input id='username' className="username" type="username" value={this.state.username} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer name'>

                        <div className='iconBox'><p><i className='fa-brands fa-galactic-senate'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Role</p>
                            <select name="role" id="role" className='role' value={this.state.role} onChange={this.handleInput} >
                                <option value="Youngling">Youngling</option>
                                <option value="Padawan">Padawan</option>
                                <option value="Jedi Knight">Jedi Knight</option>
                                <option value="Jedi Master">Jedi Master</option>
                                <option value="Jedi Grand Master">Jedi Grand Master</option>
                                <option value="Droid">Droid</option>
                                <option value="Sith Apprentice">Sith Apprentice</option>
                                <option value="Sith Master">Sith Master</option>
                            </select>
                        </div>

                    </div>

                    <div className='formFieldContainer birthdate'>

                        <div className='iconBox'><p><i className='fa-regular fa-calendar-days'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Birthdate</p>
                            <input id='birthdate' className="birthdate" type="date" value={this.state.birthdate} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer password'>

                        <div className='iconBox'><p><i className='fas fa-lock'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Current Password</p>
                            <input id='currentPassword' className="password" type="password" value={this.state.currentPass} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer password'>

                        <div className='iconBox'><p><i className='fas fa-key'></i></p></div>
                        <div className='formField'>
                            <p className='label'>New Password</p>
                            <input id='newPassword' className="password" type="password" value={this.state.newPass} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer password'>

                        <div className='iconBox'><p><i className='fas fa-unlock-keyhole'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Confirm New Password</p>
                            <input id='confirmNewPassword' className="password" type="password" value={this.state.confirmNewPass} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer button'>
                        <input type='submit' id='submit' className='button submit'/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Edit;