import React, {Component} from 'react'
import './style.css'
import {get_token} from "./auth";
import {API_URL} from "./settings";

function check_code(response) {
    if (response.status !== 200) {
        if (response.status === 401) {
            alert('Auth error')
        }
        if (response.status === 404) {
            alert('No user')
        }
        return;
    }
    return response.json()
}

function post_changes(state) {

    fetch(API_URL + 'users/me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + get_token(),
        }
    })
        .then(response => check_code(response))
        .then(function (json) {
            let put_json = {
                name: state.name ? state.name : json.name,
                info: state.info ? state.info : json.info,
                birthday: state.birthday ? new Date(state.birthday).toISOString() : json.birthday,
            };

            fetch(API_URL + 'users/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + get_token(),
                },
                body: JSON.stringify(put_json)
            })
                .then(response => check_code(response))
                .then(function (json) {
                    if (state.avatar) {
                        let formData = new FormData();
                        formData.append('file', state.avatar);

                        fetch(API_URL + 'users/me/photo', {
                            method: 'PUT',
                            headers: {
                                'Authorization': 'Bearer ' + get_token(),
                            },
                            body: formData
                        })
                            .then(response => check_code(response))
                            .catch(function (error) {
                                console.log('Request failed', error)
                            });
                    }
                })
                .catch(function (error) {
                    console.log('Request failed', error)
                });
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
}

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            info: '',
            birthday: '',
            avatar: null
        };

        this.text_change = this.text_change.bind(this);
        this.img_change = this.img_change.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(event) {
        event.preventDefault();

        post_changes(this.state);
        window.location.replace("/");
    }

    text_change(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    img_change(event) {
        const value = event.target.files[0];

        this.setState({
            avatar: value
        });
    }

    render() {
        return <div className="news-container">
            <form className="form" onSubmit={this.submit}>
                <label>Name</label>
                <input type="text" name="name" onChange={this.text_change}/>

                <label>Birthday</label>
                <input type="date" name="birthday" onChange={this.text_change}/>

                <label>Info</label>
                <input type="text" name="info" onChange={this.text_change}/>

                <label>Avatar</label>
                <input type="file" name="avatar" onChange={this.img_change}/>

                <input type="submit" value="Save"/>

            </form>
        </div>;
    }
}

export default EditProfile;
