import React from 'react';
import { browserHistory } from 'react-router';
import Api from './api';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    if (Api.getAuthToken()) {
      Api.get('/users/me')
        .then(response => browserHistory.push('/profile/' + response.data.id));
    }
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      birthday: new Date()
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordRepeatChange = this.handlePasswordRepeatChange.bind(this);
    this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    browserHistory.push('/register');
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailChange(event) {
    if (/[a-zA-Z0-9.\-_]+@[a-zA-Z0-9\-_]+(\.[a-z]+)+/.test(event.target.value)) {
      this.emailClass = 'okay-input';
    } else {
      this.emailClass = 'error-input';
    }
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    if (event.target.value !== this.state.passwordRepeat) {
      this.passwordClass = 'error-input';
    } else {
      this.passwordClass = 'okay-input';
    }
    this.setState({ password: event.target.value });
  }

  handlePasswordRepeatChange(event) {
    if (this.state.password !== event.target.value) {
      this.passwordClass = 'error-input';
    } else {
      this.passwordClass = 'okay-input';
    }
    this.setState({ passwordRepeat: event.target.value });
  }

  handleBirthdayChange(event) {
    this.setState({ birthday: event.target.value });
  }

  handleSubmit(event) {
    let self = this;
    Api.post('/identity/signup', self.state)
      .then(function (response) {
        Api.setAuthToken(response.data.token);
        Api.get('/users/me')
          .then(response => browserHistory.push('/profile/' + response.data.id));
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2 className="title">Registration</h2>
        <form className="container" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" placeholder="username" value={this.state.name}
              onChange={this.handleNameChange} />
            <br/>
            E-mail:
            <input type="text" placeholder="address@mail.com" value={this.state.email}
              className={this.emailClass} onChange={this.handleEmailChange} />
            <br/>
            Password:
            <input type="password" placeholder="***" value={this.state.password}
              onChange={this.handlePasswordChange} />
            <br/>
            Again:
            <input type="password" placeholder="***" value={this.state.passwordRepeat}
              className={this.passwordClass} onChange={this.handlePasswordRepeatChange} />
            <br/>
            Birthday:
            <input type="date" value={this.state.birthday}
              onChange={this.handleBirthdayChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
