import React, {Component} from 'react'

import BaseInput from './BaseInput'
import DateInput from './DateInput'
import PhotoInput from './PhotoInput'

import {editUserInfo, editUserAvatar, getUser} from "../api";


export default class Settings extends Component {
    state = {
        name: undefined,
        birthDate: undefined,
        info: undefined,
        avatar: undefined,
        avatarUrl: undefined
    };

    componentWillMount() {
        const {token, userId} = this.props.getUser();
        let userDetails;
        getUser(userId, token).then(json => {
            userDetails = json;
            this.setState({
                name: userDetails.name,
                birthDate: userDetails.birthday,
                info: userDetails.info,
                avatarUrl: userDetails.imageUrl
            })
        })
    }

    onBirthDateChange = (value) => this.setState({birthDate: value});
    onNameChange = (value) => this.setState({name: value});
    onAvatarChange = (value) => this.setState({avatar: value});
    onInfoChange = (value) => this.setState({info: value});

    onFormSubmit = (event) => {
        event.preventDefault();
        const {token} = this.props.getUser();
        if (this.state.avatar) {
            editUserAvatar(token, this.state.avatar)
        }
        editUserInfo(token, this.state.name, this.state.birthDate, this.state.info).then(() => {
            this.componentWillMount()
        });
    };

    render() {
        if (this.state.name === undefined && this.state.avatarUrl === undefined) {
            return null;
        }
        document.title = 'Edit Profile';
        return (
            <div>
                <h1 className="centerText">Edit Profile</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div style={{display: "flex"}}>
                        <div>
                            <PhotoInput id="avatar_input"
                                        name="avatar"
                                        label="Avatar:"
                                        previewUrl={this.state.avatarUrl}
                                        onChange={this.onAvatarChange}/>
                        </div>
                        <div>
                            <BaseInput id="name_input"
                                       type="text"
                                       name="name"
                                       label="Name:"
                                       value={this.state.name}
                                       onChange={this.onNameChange}
                            />
                            <DateInput label="Birth Date:"
                                       onChange={this.onBirthDateChange}
                                       value={this.state.birthDate}/>
                            <BaseInput id="info_input"
                                       type="text"
                                       name="info"
                                       label="Info:"
                                       value={this.state.info}
                                       onChange={this.onInfoChange}/>
                        </div>

                    </div>
                    <div className="submit_row">
                        <input type="submit" className="button" value="Save"/>
                    </div>
                </form>
            </div>
        )
    }

}