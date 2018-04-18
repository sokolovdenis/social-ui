import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'

import {getUserInfo, signInUser} from '../api'
import {signInAction} from "../actions";

import logo from './images/logo.png'
import './components.css';

/*
    Страница авторизации на сайте
 */

class LogInPresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        document.title = "Friends - Log In";
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
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
                            <h3>Sign in</h3>
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
                            <div className="input_row remember_row">
                                <input id="save_details_input"
                                       type="checkbox"
                                       name="remember"
                                       checked={this.state.remember}
                                       onChange={this.handleInputChange}/>
                                <h4><label htmlFor="save_details_input">Don't forget me:</label></h4>
                            </div>
                            <div className="submit_row">
                                <input type="submit" value="Enter" size="40"/>
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
        /*
            Входит по логину и паролю и запрашивает данные о пользователе
            по его токену для пересылки на страницу его профиля. Считаем,
            что после аутентификации пользователя его userId изменяться
            не может.
        */
        authenticate: (event, state) => {
            event.preventDefault();
            signInUser(state.email, state.password).then((response) => {
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

const LogInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogInPresentation);

export default LogInContainer;