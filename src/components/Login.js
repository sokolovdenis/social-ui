import React, { Component } from 'react';
import fetch from 'cross-fetch'

import { ROOT_URL, checkResponse, handleError } from '../actions/actions'
import './Login.css';

function handleSignIn(state, callback) {
  if (!state.email || !state.password) {
    alert("Не заполнено поле e-mail или пароль")
  }
  fetch(ROOT_URL + 'identity/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: state.email,
      password: state.password
    })
  }).then(response => checkResponse(response))
  .then(json => callback(json.token, true))
  .catch(err => handleError(err, alert))
}

function handleSignUp(state, callback) {
  if (!state.email || !state.password || !state.name || !state.birthday) {
    alert("Все поля обязательны")
  }
  fetch(ROOT_URL + 'identity/signup', {
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
  }).then(response => checkResponse(response))
  .then(json => callback(json.token, true))
  .catch(err => handleError(err, alert))
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      birthday: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name || this.state.birthday) {
      handleSignUp(this.state, this.props.call)
    } else {
      handleSignIn(this.state, this.props.call)
    }
  }

  render() {
    return (
      <div>
        <p>Заполняешь email и пароль -- входишь, заполняешь всё -- регаешься</p>
      <form onSubmit={this.handleSubmit}>
        <label>
          E-mail:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange} />
        </label>
        <label>
          Birthday:
          <input
            name="birthday"
            type="date"
            value={this.state.birthday}
            onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default Login