import React from 'react';
import { browserHistory, Redirect } from 'react-router';
import Api from './api';

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: window.compactSocial.currentId,
      name: '',
      info: '',
      imageUrl: '',
      birthday: new Date()
    };
    let self = this;
    Api.get('/users/' + window.compactSocial.currentId)
      .then(response => self.setState(response))
      .catch(err => self.setState({ id: false }));
  }

  render() {
    if (this.state.id === false) {
      return (<Redirect to="/register" />);
    }
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>{this.state.name}</h2>
        <img src={this.state.imageUrl} alt="invalid"/>
        <div class="container">
          {this.state.info}
          {this.state.birthday}
        </div>
      </div>
    );
  }
}