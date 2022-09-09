import React, {Component} from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail } from 'firebase/auth';
import createUser from '../../helpers/auth/signup';
import { db } from '../../../db/application/db';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import Loading from '../loading/Loading';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: props.user.email,
            username: '',
            birthdate: '',
            role: '',
            currentPass: '',
            newPass: '',
            confirmNewPass: '',
            errors: '',
            initializing: true
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchProfile = this.fetchProfile.bind(this);
    }

    async fetchProfile(user) {
        const profile = await getDoc(doc(db, 'users', user.uid));
        this.setState({
            name: profile.data().name,
            username: profile.data().username,
            birthdate: profile.data().birthdate,
            role: profile.data().role
        })
        this.setState({initializing: false})
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
        const auth = getAuth();
        //if newPassword is filled in, make sure confirmNewPassword matches, then attempt to update password
        // this will require currentPass for reauthentication (See Delete for reauthentication process)
        if(this.state.newPass) {

            if(this.state.newPass === this.state.confirmNewPass) {

                const credential = EmailAuthProvider.credential(this.props.user.email, this.state.currentPass);

                await reauthenticateWithCredential(auth.currentUser, credential).then(() => {

                    updatePassword(auth.currentUser, this.state.newPass).then(() => {

                    }).catch((error) => {console.log(error)})

                }).catch((error) => console.log(error))

            } else {

                this.setState({error: "Passwords Don't Match."})

            }
        }

        //if email has changed, require currentPass for reauthentication
        if(this.state.email != auth.currentUser.email) {

            const credential = EmailAuthProvider.credential(auth.currentUser.email, this.state.currentPass);

            await reauthenticateWithCredential(auth.currentUser, credential).then(() => {
                
                updateEmail(auth.currentUser, this.state.email).then(() => {

                }).catch((error) => {console.log(error)});

            }).catch((error) => {console.log(error)})

        }
        
        //update all other fields whether currentPass was given or not.
        //force non-empty fields for name, role, username
        if(this.state.name && this.state.role && this.state.username && this.state.birthdate) {
            //updateDoc()
            await updateDoc(doc(db, 'users', this.props.user.uid), {

                name: this.state.name,
                username: this.state.username,
                birthdate: this.state.birthdate,
                role: this.state.role

            }).catch((e) => {console.log(e)})

            this.props.changeView('user');

        } else {
            this.setState({error: "Name, Username, Role and Birthdate must be filled in."})
        }
    };

    componentDidMount() {
        this.fetchProfile(this.props.user);
    }

    render() {
        
        if(this.state.initializing) {
            return (<Loading />)
        }
        return (
            <div className='Edit'>
                <div className='formTitle'>
                    <p className='title'>Edit User</p>
                    <p className='subtitle sw'>Edit User</p>
                    <p className='userId sw'>{this.props.user.uid}</p>
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