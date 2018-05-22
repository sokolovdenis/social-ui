import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import BaseInput from './BaseInput'

import {getMe, signUp} from "../api";

import style from './components.css';
import DateInput from "./DateInput";

class SignUpForm extends Component {
    state = {
        email: '',
        password: '',
        username: '',
        birthDate: '',
        photo: undefined
    };

    onBirthDateChange = (value) => this.setState({birthDate: value});
    onEmailChange = (value) => this.setState({email: value});
    onPasswordChange = (value) => this.setState({password: value});
    onUsernameChange = (value) => this.setState({username: value});

    onFormSubmit = (event) => {
        event.preventDefault();
        signUp(this.state.email, this.state.password, this.state.username, this.state.birthDate).then(ntoken =>{
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg0IiwiZXhwIjoxNTI3MDEzOTk4fQ.f89XWK7Vhg2QtVb-k76Hf8pHMV0wQHB0XL6xMqBHZE0';
            if (token) {
                getMe(token).then(user_id =>{
                    if (user_id) {
                        this.props.setUser(user_id, token, true)
                    }
                });
            }
        });
    };

    render() {
        document.title = "Sign Up";
        if (this.props.isAuthenticated()) {
            return <Redirect to={{
                pathname: "/profile/" + String(this.props.userId)
            }}/>
        } else {
            return (
                <div>
                    <form onSubmit={this.onFormSubmit}>
                        <h1 className="centerText">Sign Up Form</h1>
                        <BaseInput id="email_input"
                                   type="text"
                                   name="email"
                                   label="Email:"
                                   value={this.state.email}
                                   onChange={this.onEmailChange}
                        />
                        <BaseInput id="password_input"
                                   type="password"
                                   name="password"
                                   label="Password:"
                                   value={this.state.password}
                                   onChange={this.onPasswordChange}/>
                        <BaseInput id="name_input"
                                   type="text"
                                   name="username"
                                   label="Username:"
                                   value={this.state.username}
                                   onChange={this.onUsernameChange}/>
                        <DateInput label="Birth Date:"
                                   onChange={this.onBirthDateChange}/>
                        <div className="submit_row">
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default SignUpForm;
