import React from 'react';
import login from '../../helpers/auth/login';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: ''
        }
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    validateEmail(event) {
        this.setState({email: event.target.value})
    }

    validatePassword(event) {
        this.setState({password: event.target.value})
    }

    //On 'Enter' run loginButton
    handleKeyPress(event) {

        if (event.charCode === 13) {

            if(event.target.id == 'login-email') {

                document.getElementById('login-password-container').style="display: inline-block";
                document.getElementById('login-password').focus();

            } else if(event.target.id == 'login-password') {

                login(this.state.email, this.state.password)
                    .then((res) => {
                        if(res.error) {
                            this.setState({errors: "Invalid Username or Password"})
                        }
                    });
            }
        }
    };

    render() {
        return (
            <div className="login">

                <div className='authentication-errors'>
                    {this.state.errors}
                </div>

                <div className='login-input-container email'>

                    <span className="input-leader"> &gt; </span>
                    <input id='login-email' className="login-email" type="email" value={this.state.email} placeholder="EMAIL" onChange={(event) => this.validateEmail(event)} onKeyPress={this.handleKeyPress} autoFocus/>

                </div>

                <div className='login-input-container password' id='login-password-container'>

                    <span className="input-leader"> &gt; </span>
                    <input id='login-password' className="login-password" type="password" value={this.state.password} placeholder="PASSWORD" onChange={(event) => this.validatePassword(event)} onKeyPress={this.handleKeyPress}/> 
                    
                </div>

            </div>
        )
    }
}

export default Login;