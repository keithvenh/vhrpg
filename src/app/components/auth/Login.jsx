import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            email: '',
            password: ''
        }
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    validateEmail(event) {
        this.setState({email: event.target.value})
    }

    validatePassword(event) {
        this.setState({password: event.target.value})
    }

    render() {
        return (
            <div className="login">

                <h1>Login</h1>

                <div className='login-input-container'>

                    <span className="input-leader"> &gt; </span>
                    <input className="login-email" type="email" value={this.state.email} placeholder="EMAIL" onChange={(event) => this.validateEmail(event)} autoFocus/>

                </div>

                <div className='login-input-container'>

                    <span className="input-leader"> &gt; </span>
                    <input className="login-password" type="password" value={this.state.password} placeholder="PASSWORD" onChange={(event) => this.validatePassword(event)} /> 
                    
                </div>

                <button className='btn btn-submit' onClick={this.buttonHandler}>Login</button>

            </div>
        )
    }
}

export default Login;