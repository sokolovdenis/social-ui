import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";

import {post_avatar, post_profile, get_profile} from "../webapi";

import './settings.css';

function toDate(date) {
    let year = date.substr(0, 4);
    let month = date.substr(5, 2);
    let day = date.substr(8, 2);
    return [day, month, year].join('/');
}

class SettingsPresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            info: "",
            image: undefined,
            date: "",
            is_loaded: false,
            redirect: false
        };
        this.handle_input_change = this.handle_input_change.bind(this);
        this.load_settings = this.load_settings.bind(this);
        this.save_settings = this.save_settings.bind(this);
        this.handle_image_change = this.handle_image_change.bind(this);
    }

    handle_input_change(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handle_image_change(event) {
        this.setState({
            image: event.target.files[0]
        });
    }

    load_settings() {
        get_profile(this.props.token).then((response) => {
            response.json().then((json) => {
                this.setState({
                    name: json.name,
                    info: json.info,
                    date: json.birthday,
                    is_loaded: true
                });
            });
        })
    }

    save_settings(event) {
        event.preventDefault();
        let dateOfBirth = this.state.date.split('/').reverse().join('-');
        dateOfBirth = new Date(dateOfBirth);
        dateOfBirth = dateOfBirth.toISOString();
        post_profile(this.props.token, this.state.name, dateOfBirth, this.state.info).then((response) => {
            if (!response.ok){
                return;
            }
            response.json().then((json) => {
                if (this.state.image !== undefined) {
                    post_avatar(this.props.token, this.state.image).then((response) => {
                        response.json().then((json) => {
                            this.setState({
                                redirect: true
                            });
                        });
                    })
                }
                else {
                    this.setState({
                        redirect: true
                    });
                }
            });
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: "/profile/" + String(this.props.user_id)
            }}/>
        }
        if (!this.state.is_loaded) {
            this.load_settings();
        }
        console.log("name " + this.state.name);
        return (
            <div className="main">
                <div className="flex_row">
                    <form onSubmit={this.save_settings}>
                        <div className="authentication_form">
                            <h3>Изменение профиля</h3>
                            <div className="input_row">
                                <h5><label htmlFor="name_input">Имя</label></h5>
                                <input
                                    id="name_input"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handle_input_change}
                                />
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
                                <h5><label htmlFor="avatar_input">Аватар</label></h5>
                                <input
                                    type="file"
                                    onChange={this.handle_image_change}
                                    id="avatar_input"
                                    name="avatar"
                                    accept="image/*"/>
                            </div>
                            <div className="input_row">
                                <h5><label htmlFor="about_me_input">Дополнительная информация</label></h5>
                                <textarea
                                    id="about_me_input"
                                    name="info"
                                    value={this.state.info}
                                    onChange={this.handle_input_change}
                                />
                            </div>
                            <div className="submit_row">
                                <input type="submit" value="Сохранить"/>
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
        user_id: state.authentication.user_id,
        token: state.authentication.token
    }
}

const SettingsContainer = connect(
    mapStateToProps
)(SettingsPresentation);

export default SettingsContainer;