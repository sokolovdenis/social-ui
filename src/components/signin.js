import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'

import {get_profile, sign_in} from '../webapi'
import {sign_in_action} from "../actions";

import './signin.css';

class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_input: "",
            psw_input: "",
            rememberme_input: true,
        };
        this.handle_input_change = this.handle_input_change.bind(this);
    }

    handle_input_change(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        document.title = "Войти";
        if (this.props.is_authenticated) {
            return <Redirect to={{
                pathname: "/profile/" + String(this.props.user_id)
            }}/>
        }
        return (
            <div className="flex_row">
                <form onSubmit={(event) => this.props.authenticate(event, this.state)}>
                    <div className="sign_form">
                        <div className="input_container">
                            <label htmlFor="email_input"><b>Почта</b></label>
                            <input
                                id="email_input"
                                name="email_input"
                                type="text"
                                defaultValue={this.state.email_input}
                                onChange={this.handle_input_change}
                            />
                        </div>
                        <div className="input_container">
                            <label htmlFor="psw_input"><b>Пароль</b></label>
                            <input
                                id="psw_input"
                                name="psw_input"
                                type="password"
                                defaultValue={this.state.psw_input}
                                onChange={this.handle_input_change}
                            />
                        </div>
                        <div className="input_container rememberme">
                            <label htmlFor="rememberme_input"><b>Запомнить</b></label>
                            <input
                                id="rememberme_input"
                                name="rememberme_input"
                                type="checkbox"
                                defaultChecked={this.state.rememberme_input}
                                onChange={this.handle_input_change}
                            />
                        </div>
                        <div className="input_container">
                            <input type="submit" value="Войти"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        is_authenticated: state.authentication.is_authenticated,
        user_id: state.authentication.user_id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authenticate: (event, state) => {
            event.preventDefault();
            sign_in(state.email_input, state.psw_input).then((response) => {
                response.json().then((json) => {
                    let token = json.token;
                    get_profile(json.token).then((response) => {
                        if (!response.ok)
                            return;
                        response.json().then((json) => {
                            let user_id = json.id;
                            dispatch(sign_in_action(token, user_id, state.rememberme_input));
                        });
                    });
                });
            });
        },
    }
}

const SignInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInComponent);

export default SignInContainer;