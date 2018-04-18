import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Cleave from 'cleave.js/react';
import {connect} from "react-redux";

import {editUserAvatarInfo, editUserInfo, getUserInfo} from "../api";

import './components.css';

/*
    Страница настроек пользователя
 */

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
            dateOfBirth: "",
            isLoaded: false,
            redirect: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.loadUserSettings = this.loadUserSettings.bind(this);
        this.uploadUserSettings = this.uploadUserSettings.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidMount() {
        document.title = "Friends - Settings";
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

    handleImageChange(event) {
        this.setState({
            image: event.target.files[0]
        });
    }

    loadUserSettings() {
        getUserInfo(this.props.token).then((response) => {
            response.json().then((json) => {
                this.setState({
                    name: json.name,
                    info: json.info,
                    dateOfBirth: toDate(json.birthday),
                    isLoaded: true
                });
            });
        })
    }

    uploadUserSettings(event) {
        event.preventDefault();
        let dateOfBirth = this.state.dateOfBirth.split('/').reverse().join('-');
        dateOfBirth = new Date(dateOfBirth);
        dateOfBirth = dateOfBirth.toISOString();
        editUserInfo(this.props.token, this.state.name, dateOfBirth, this.state.info).then((response) => {
            if (!response.ok){
                return;
            }
            response.json().then((json) => {
                if (this.state.image !== undefined) {
                    editUserAvatarInfo(this.props.token, this.state.image).then((response) => {
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
                pathname: "/profile/" + String(this.props.userId)
            }}/>
        }
        if (!this.state.isLoaded) {
            this.loadUserSettings();
        }
        return (
            <main>
                <div className="flex_row">
                    <form onSubmit={this.uploadUserSettings}>
                        <div className="authentication_form">
                            <h3>Change Profile settings</h3>
                            <div className="input_row">
                                <h4><label htmlFor="name_input">Name:</label></h4>
                                <input
                                    id="name_input"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="input_row">
                                <h4><label htmlFor="date_input">Date of Birth:</label></h4>
                                <Cleave
                                    id="date_input"
                                    value={this.state.dateOfBirth}
                                    options={{date: true, datePattern: ['d', 'm', 'Y']}}
                                    onChange={this.handleDateChange}/>
                            </div>
                            <div className="input_row">
                                <h4><label htmlFor="avatar_input">Avatar:</label></h4>
                                <input
                                    type="file"
                                    onChange={this.handleImageChange}
                                    id="avatar_input"
                                    name="avatar"
                                    accept="image/*"/>
                            </div>
                            <div className="input_row">
                                <h4><label htmlFor="about_me_input">Info:</label></h4>
                                <textarea
                                    id="about_me_input"
                                    name="info"
                                    value={this.state.info}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="submit_row">
                                <input type="submit" value="Save Changes"/>
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
        userId: state.authentication.userId,
        token: state.authentication.token
    }
}

const SettingsContainer = connect(
    mapStateToProps
)(SettingsPresentation);

export default SettingsContainer;