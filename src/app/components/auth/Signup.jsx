import React, {Component} from 'react';
import createUser from '../../helpers/auth/signup';
import { db } from '../../../db/application/db';
import { doc, setDoc } from 'firebase/firestore';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            username: '',
            favTeam: '',
            birthdate: '',
            pass: '',
            confirmPass: '',
            errors: '',
            role: 'Padawan'
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
            case 'birthdate':
                this.setState({birthdate: value});
                break;
            case 'favTeam':
                this.setState({favTeam: value});
                break;
            case 'password':
                this.setState({pass: value});
                break;
            case 'confirmPassword':
                this.setState({confirmPass: value});
                break;
            default:
                console.log('Error ' + e.target.id + ' does not exist');

        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.pass === this.state.confirmPass) {

            const user = await createUser(this.state.email, this.state.pass);

            await setDoc(doc(db, 'users', user.uid), {
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
            <div className='Signup'>
                <div className='formTitle'>
                    <p className='title'>Signup</p>
                    <p className='subtitle sw'>Signup</p>
                </div>
                <form className='signupForm' onSubmit={this.handleSubmit}>
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

                    <div className='formFieldContainer birthdate'>

                        <div className='iconBox'><p><i className='fa-regular fa-calendar-days'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Birthdate</p>
                            <input id='birthdate' className="birthdate" type="date" value={this.state.birthdate} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer password'>

                        <div className='iconBox'><p><i className='fas fa-key'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Password</p>
                            <input id='password' className="password" type="password" value={this.state.pass} onChange={this.handleInput} />
                        </div>

                    </div>

                    <div className='formFieldContainer password'>

                        <div className='iconBox'><p><i className='fas fa-unlock-keyhole'></i></p></div>
                        <div className='formField'>
                            <p className='label'>Confirm Password</p>
                            <input id='confirmPassword' className="password" type="password" value={this.state.confirmPass} onChange={this.handleInput} />
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

export default Signup;