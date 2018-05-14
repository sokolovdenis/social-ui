import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {get_profile, sign_up} from "../webapi";
import {sign_in_action} from "../actions";

class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user_name: "",
            date: ""
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
        document.title = "Регистрация";
        if (this.props.is_authenticated) {
            return <Redirect to={{
                pathname: "/profile/" + String(this.props.user_id)
            }}/>
        }
        return (
            <div className="main">
                <div className="flex_row">
                    <form onSubmit={(event) => this.props.authenticate(event, this.state)}>
                        <div className="signup_form">
                            <h3>Регистрация</h3>
                            <div className="input_row">
                                <h5><label htmlFor="name_input">Имя:</label></h5>
                                <input id="name_input"
                                       type="text"
                                       name="user_name"
                                       value={this.state.user_name}
                                       onChange={this.handle_input_change}/>
                            </div>
                            <div className="input_row">
                                <h5><label htmlFor="date_input">Дата рождения</label></h5>
                                <input
                                    id="date_input"
                                    type="text"
                                    name="date"
                                    placeholder="DD/MM/YYYY"
                                    value={this.state.date}
                                    onChange={this.handle_input_change}/>
                            </div>
                            <div className="input_row">
                                <h5><label htmlFor="email_input">Почта:</label></h5>
                                <input id="email_input"
                                       type="text"
                                       name="email"
                                       value={this.state.email}
                                       onChange={this.handle_input_change}/>
                            </div>
                            <div className="input_row">
                                <h5><label htmlFor="password_input">Пароль:</label></h5>
                                <input id="password_input"
                                       type="password"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.handle_input_change}/>
                            </div>
                            <div className="submit_row">
                                <input type="submit" value="Submit"/>
                            </div>
                        </div>
                    </form>
                </div>
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
        authenticate: function (event, state) {
            event.preventDefault();
            let dateOfBirth = state.date.split('/').reverse().join('-');
            dateOfBirth = new Date(dateOfBirth).toISOString();
            sign_up(state.email, state.password, state.user_name, dateOfBirth).then(function (response) {
                if (!response.ok)
                    return;
                response.json().then((json) => {
                    let token = json.token;
                    get_profile(json.token).then((response) => {
                        if (!response.ok)
                            return;
                        response.json().then((json) => {
                            let user_id = json.id;
                            dispatch(sign_in_action(token, user_id))
                        });
                    });
                });
            });
        },
    }
}

const SignUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpComponent);

export default SignUpContainer;