import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import './Start.css';

const mapStateToProps = state => ({
    token: state.token,
    currentUserId: state.currentUserId,
});

function parseDate(date) {
    let dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return `${year}-${month}-${day}`;
}

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            errorMessage: "",
            userData: null,
            redirect: false,
            image: null,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.getMyInfo = this.getMyInfo.bind(this);
        this.onImgChange = this.onImgChange.bind(this);
    }

    onImgChange(event) {
        event.preventDefault();
        this.setState({
            image: event.target.files[0],
        });
    }

    onSubmit(event) {

        event.preventDefault();
        this.setState({isLoading: true});

        let formData = new FormData(event.target);

        let data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });

        formData.forEach(function(value, key) {
            formData.delete(key);
        });

        if (this.state.image) {
            this.attachImage(this.state.image);
        }

        fetch('http://social-webapi.azurewebsites.net/api/users/me/', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(() => {
                if (!this.state.image) {
                    this.setState({
                        isLoading: false,
                        redirect: true,
                    })
                }
            })
            .catch(error => this.setState({error, errorMessage: error.message}));
    }

    attachImage(file) {

        let formData = new FormData();
        formData.append('file', file);

        fetch(`http://social-webapi.azurewebsites.net/api/users/me/photo`, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            },
            method: 'PUT',
            body: formData,
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(() => {
            this.setState({
                isLoading: false,
                redirect: true,
            })
        });
    }

    getMyInfo() {

        this.setState({isLoading: true});

        fetch(`http://social-webapi.azurewebsites.net/api/users/me/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => this.setState({
                isLoading: false,
                userData: data,
            }))
            .catch(error => this.setState({error, errorMessage: error.message}));
    }

    componentWillMount() {
        this.getMyInfo();
    }

    render() {

        if (this.state.isLoading) {
            return (
                <div className="global-info">Loading...</div>
            )
        }

        if (this.state.errorMessage) {
            return (
                <div className="global-error global-info">{this.state.errorMessage}</div>
            )
        }

        if (this.state.redirect) {
            return (
                <Redirect push to={`/profile/${this.props.currentUserId}`} />
            );
        }

        return (
            <div className="invite-content">
                <div className="invite-sign-header">Edit</div>
                    <form onSubmit={this.onSubmit}>
                        <label>
                            <span className="invite-sign-label">Full name</span>
                            <input type="name" defaultValue={this.state.userData.name} name="name"
                                   className="invite-sign-input" placeholder="Full name"/><br/>
                        </label>
                        <label>
                        <span className="invite-sign-label">Info</span>
                        <input type="text" defaultValue={this.state.userData.info} name="info"
                               className="invite-sign-input" placeholder="Info"/><br/>
                        </label>
                        <label>
                        <span className="invite-sign-label">Birthday</span>
                        <input type="date" defaultValue={parseDate(this.state.userData.birthday)}
                               className="invite-sign-input" name="birthday" placeholder="Birthday"/><br/>
                        </label>
                        <label>
                        <span className="invite-sign-label">Change avatar</span>
                        <input type="file" name="avatar" onChange={this.onImgChange} /><br/>
                        </label>
                        <button className="invite-sign-button">Edit</button>
                    </form>
                    <div className="error">{this.state.errorMessage}</div>

            </div>
        );
    }
}

export default connect(mapStateToProps)(EditProfile);
