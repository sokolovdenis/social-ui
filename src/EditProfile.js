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

    return year + '-' + month + '-' + day;
}

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            errorMessage: "",
            userData: null,
            redirect: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.getMyInfo = this.getMyInfo.bind(this);
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

        fetch('http://social-webapi.azurewebsites.net/api/users/me/', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(() => this.setState({
                isLoading: false,
                redirect: true,
            }))
            .catch(error => this.setState({error, errorMessage: error.message}));
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
                <div>Loading...</div>
            )
        }

        if (this.state.error) {
            return (
                <div>{this.state.error.message}</div>
            )
        }

        if (this.state.redirect) {
            return (
                <Redirect push to={`/profile/${this.props.currentUserId}`} />
            );
        }

        return (
            <div className="Start">

                Edit
                <form onSubmit={this.onSubmit}>
                    <input type="name" defaultValue={this.state.userData.name} name="name" placeholder="Full name"/><br/>
                    <input type="text" defaultValue={this.state.userData.info} name="info" placeholder="Info"/><br/>
                    <input type="date" defaultValue={parseDate(this.state.userData.birthday)}
                           name="birthday" placeholder="Birthday"/><br/>
                    <button>Edit</button>
                </form>
                <div className="error">{this.state.errorMessage}</div>

            </div>
        );
    }
}

export default connect(mapStateToProps)(EditProfile);
