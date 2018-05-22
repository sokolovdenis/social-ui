import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import {getMe, signIn} from '../api'

import style from './components.css';


class SignInForm extends Component {
    state = {
        email: "",
        password: "",
        remember: false,
        wrongPassword: false,
        serverError: false
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    onEmailChange = (event) => this.setState({email: event.target.value});
    onPasswordChange = (event) => this.setState({password: event.target.value});
    onRememberMeChange = (event) => this.setState({remember: event.target.checked});
    onSubmit = (event) => {
        event.preventDefault();
        signIn(this.state.email, this.state.password).then(token => {
            if (token === null) {
                this.setState({wrongPassword: true})
            } else if (token === undefined) {
                this.props.onBackEndError();
            } else {
                getMe(token).then(userId => {
                    this.props.setUser(userId, token, !this.state.remember)
                });
            }
        });
    };

    render() {
        document.title = "Sign In";
        if (this.props.isAuthenticated()) {
            return <Redirect to={{
                pathname: "/profile/" + this.props.getUser().userId
            }}/>
        } else {
            return (
                <div>
                    {this.state.wrongPassword ? (<p>Wrong Login/Password</p>) : null}
                    <form onSubmit={this.onSubmit}>
                        <div className="input_row">
                            <h4><label htmlFor="email_input">Email:</label></h4>
                            <input id="email_input"
                                   type="text"
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.onEmailChange}/>
                        </div>
                        <div className="input_row">
                            <h4><label htmlFor="password_input">Password:</label></h4>
                            <input id="password_input"
                                   type="password"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.onPasswordChange}/>
                        </div>
                        <div className="input_row remember_row">
                            <input id="save_details_input"
                                   type="checkbox"
                                   name="remember"
                                   checked={this.state.remember}
                                   onChange={this.onRememberMeChange}/>
                            <h4><label htmlFor="save_details_input">Don't forget me</label></h4>
                        </div>
                        <div className="submit_row">
                            <input type="submit" value="Enter" size="40"/>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default SignInForm;
