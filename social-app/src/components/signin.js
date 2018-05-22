import React from 'react';
import Api from '../api'
import './SignIn.css'

class SignIn extends React.Component {

    getLoginData() {
        return {
            email: document.querySelector("#login-form-email").value,
            password: document.querySelector("#login-form-password").value
        };
    }

    async onSubmit(event) {
        event.preventDefault();

        try {
            await Api.signIn(this.getLoginData())
            await this.props.onAuthenticatedHandler();
        } catch (e) {
            alert('Failed to log in: ' + Api.description(e));
        }
    }

    render() {
        return (
            <div className="login">
                <div className="login-container">
                    <h1>Log in</h1>
                    <form id="login-form" className="login-form" onSubmit={async (event) => await this.onSubmit(event)}>
                        <div>
                            <input id="login-form-email" className="login-input-text" type="email" name="email" placeholder="Email" />
                        </div>
                        <div>
                            <input id="login-form-password" className="login-input-text" type="password" name="password" placeholder="Password" />
                        </div>
                        <input className="login-submit" type="submit" value="Log in"/>
                        <span className="login-input-checkbox">
                            <input type="checkbox" name="rememer-me" />
                            <label>Remember me</label>
                        </span>
                    </form>
                    <div>
                        New? <a href="registration.html">Register now!</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;