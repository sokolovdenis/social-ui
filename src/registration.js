import React from 'react';
import { browserHistory, Redirect } from 'react-router';
import Api from './api';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      birthday: new Date(),
      loggedIn: false
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
    alert('A name was submitted: ' + JSON.stringify(this.state));
    Api.post('/identity/signup', this.state)
      .then(function (response) {
        console.dir(response);
        Api.setAuthToken(response.token);
        Api.get('/users/me')
          .then(function (response) {
            window.compactSocial.currentPage = window.compactSocial.pages.PROFILE;
            window.compactSocial.currentId = response.id;
            window.compactSocial.userId = response.id;
            this.setState({ loggedIn: true });
          }); 
      });
    event.preventDefault();
  }

  render() {
    if (this.state.loggedIn) {
      return (<Redirect to="/profile"/>);
    }
    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Registration</h2>
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