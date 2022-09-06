import React, {Component} from 'react';
import createUser from '../../helpers/auth/signup';
import { db } from '../../../db/application/db';
import { doc, setDoc } from 'firebase/firestore';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
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
            case 'firstName':
                this.setState({fName: value});
                break;
            case 'lastName':
                this.setState({lName: value})
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
                                        firstName: this.state.fName,
                                        lastName: this.state.lName,
                                        username: this.state.username,
                                        birthdate: this.state.birthdate,
                                        role: this.state.role
                            }).catch((e) => {console.log(e)})
            this.props.changeView('dashboard');
        } else {
            this.setState({error: "Passwords Don't Match."})
        }
    }

    render() {

        return (
            <form className='Signup' onSubmit={this.handleSubmit}>
                <div className='formField'>
                    <p className='errors'>{this.state.errors}</p>
                </div>

                <div className='formField name'>
                    <div className='formField'>
                        <p className='label'>First Name</p>
                        <input type='text' onChange={this.handleInput} id='firstName' value={this.state.fName} />
                    </div>
                    <div className='formField'>
                        <p className='label'>Last Name</p>
                        <input type='text' onChange={this.handleInput} id='lastName' value={this.state.lName} />
                    </div>
                </div>

                <div className='formField'>
                    <p className='label'>Email</p>
                    <input type='email' onChange={this.handleInput} id='email' value={this.state.email}/>
                </div>

                <div className='formField'>
                    <p className='label'>Username</p>
                    <input type='username' onChange={this.handleInput} id='username' />
                </div>

                <div className='formField'>
                    <p className='label'>Birthdate</p>
                    <input type='date' onChange={this.handleInput} id='birthdate' value={this.state.birthdate} />
                </div>

                <div className='formField'>
                    <p className='label'>Password</p>
                    <input type='password' onChange={(e) => this.handleInput(e)} id='password' value={this.state.pass} />
                </div>

                <div className='formField'>
                    <p className='label'>Confirm Password</p>
                    <input type='password' onChange={(e) => this.handleInput(e)} id='confirmPassword' value={this.state.confirmPass} />
                </div>

                <div className='formField button'>
                    <input type='submit' id='submit' className='button submit'/>
                </div>
            </form>
        )
    }
}

export default Signup;