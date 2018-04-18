import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Cleave from 'cleave.js/react';

import {getUserInfo, signUpUser} from "../api";
import {signInAction} from "../actions";

import logo from './images/logo.png'
import './components.css';

/*
    Страница регистрации на сайте
 */

class RegisterPresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user_name: "",
            dateOfBirth: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleDateChange(event) {
        this.setState({
            dateOfBirth: event.target.value
        });
    }

    render() {
        document.title = "Friends - Register";
        if (this.props.isAuthenticated) {
            return <Redirect to={{
                pathname: "/profile/" + String(this.props.userId)
            }}/>
        }
        return (
            <main>
                <div className="flex_row">
                    <div className="login_image">
                        <img src={logo} alt="logo"/>
                    </div>
                    <form onSubmit={(event) => this.props.authenticate(event, this.state)}>
                        <div className="authentication_form">
                            <h3>Create your personal account</h3>
                            <div className="input_row">
                                <h4><label htmlFor="email_input">Email:</label></h4>
                                <input id="email_input"
                                       type="text"
                                       name="email"
                                       value={this.state.email}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="input_row">
                                <h4><label htmlFor="password_input">Password:</label></h4>
                                <input id="password_input"
                                       type="password"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="input_row">
                                <h4><label htmlFor="name_input">Name:</label></h4>
                                <input id="name_input"
                                       type="text"
                                       name="user_name"
                                       value={this.state.user_name}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="input_row">
                                <h4><label htmlFor="date_input">Date of Birth:</label></h4>
                                <Cleave options={{date: true, datePattern: ['d', 'm', 'Y']}}
                                        onChange={this.handleDateChange}/>
                            </div>
                            <div className="submit_row">
                                <input type="submit" value="Submit"/>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        userId: state.authentication.userId
    }
}


function mapDispatchToProps(dispatch) {
    return {
        authenticate: function (event, state) {
            event.preventDefault();
            let dateOfBirth = state.dateOfBirth.split('/').reverse().join('-');
            dateOfBirth = new Date(dateOfBirth).toISOString();
            signUpUser(state.email, state.password, state.user_name, dateOfBirth).then(function (response) {
                if (!response.ok)
                    return;
                response.json().then((json) => {
                    let token = json.token;
                    getUserInfo(json.token).then((response) => {
                        if (!response.ok)
                            return;
                        response.json().then((json) => {
                            let userId = json.id;
                            dispatch(signInAction(token, userId))
                        });
                    });
                });
            });
        },
    }
}

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPresentation);

export default RegisterContainer;