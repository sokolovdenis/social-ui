import React, {Component} from 'react'
import './style.css'

import {API_URL} from './settings'
import {login} from './auth'

function check_code(response) {
    if (response.status !== 200) {
        alert('No user with such email and password')
        return;
    }
    return response.json()
}

function post_login(state) {
    fetch(API_URL + 'identity/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: state.email,
            password: state.password
        })
    })
        .then(response => check_code(response))
        .then(json => login(json.token, state.remember))
        .catch(function (error) {
            console.log('Request failed', error)
        });
}


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            remember: false,
        };

        this.input_change = this.input_change.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(event) {
        event.preventDefault();
        post_login(this.state);
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

                <label>Remember
                    <input type="checkbox" name="remember" onChange={this.input_change}/>
                </label>

                <input type="submit" value="Enter"/>

            </form>
        </div>;
    }
}

export default Login;
