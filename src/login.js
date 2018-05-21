import React from 'react';
import { browserHistory } from 'react-router';
import Api from './api';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    if (Api.getAuthToken()) {
      Api.get('/users/me')
        .then(response => browserHistory.push('/profile/' + response.data.id));
    }
    this.state = {
      email: '',
      password: '',
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    browserHistory.push('/login');
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
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    let self = this;
    Api.post('/identity/signin', self.state)
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
        <h2 className="title">Log in</h2>
        <form className="container" onSubmit={this.handleSubmit}>
          <label>
            E-mail:
            <input type="email" placeholder="address@mail.com" value={this.state.email}
              className={this.emailClass} onChange={this.handleEmailChange} />
            <br/>
            Password:
            <input type="password" placeholder="***" value={this.state.password}
              onChange={this.handlePasswordChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
