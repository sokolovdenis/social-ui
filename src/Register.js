import React, {Component} from 'react'
import './style.css'
import {API_URL} from "./settings";
import {login} from './auth'

function check_code(response) {
    if (response.status !== 200) {
        if (response.status === 409) {
            alert('This email already used')
        }
        if (response.status === 400) {
            alert('Some information are not valid')
        }
        return;
    }
    return response.json()
}

function post_register(state) {
    fetch(API_URL + 'identity/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: state.email,
            password: state.password,
            name: state.name,
            birthday: new Date(state.birthday).toISOString()
        })
    })
        .then(response => check_code(response))
        .then(json => login(json.token, true))
        .catch(function (error) {
            console.log('Request failed', error)
        });
}

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            birthday: ''
        };

        this.input_change = this.input_change.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(event) {
        event.preventDefault();
        post_register(this.state);
    }

    input_change(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return <div className="news-container">
            <form className="form" onSubmit={this.submit}>
                <label>Email</label>
                <input type="email" name="email" required onChange={this.input_change}/>

                <label>Password</label>
                <input type="password" name="password" required onChange={this.input_change}/>

                <label>Name</label>
                <input type="text" name="name" required onChange={this.input_change}/>

                <label>Birthday</label>
                <input type="date" name="birthday" required onChange={this.input_change}/>

                <input type="submit" value="Register"/>

            </form>
        </div>;
    }
}

export default Register;
