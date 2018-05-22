import React from 'react';
import { browserHistory } from 'react-router';
import Api from './api';

export default class HeaderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: false
    };
    let self = this;
    Api.get('/users/me')
      .then(response => self.setState({ id: response.data.id }));
  }
  
  logout() {
    Api.removeAuthToken();
    browserHistory.push('/login');
  }
  
  render() {
    return (
      <div className="container header">
        <div className="inline-box">
          <a href={'/profile/' + this.state.id}>My Profile</a>
        </div>
        <div className="inline-box">
          <a href={'/feed'}>Feed</a>
        </div>
        <div className="inline-box">
          <a href="/profile">All Profiles</a>
        </div>
        <div className="inline-box">
          <a href="/logout">Log Out</a>
        </div>
        <hr/>
      </div>
    );
  }
}
