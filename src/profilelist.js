import React from 'react';
import { browserHistory } from 'react-router';
import Api from './api';
import HeaderForm from './header';

export default class ProfileListForm extends React.Component {
  constructor(props) {
    super(props);
    if (!Api.getAuthToken()) {
      browserHistory.push('/login');
    }
    this.state = {
      users: []
    };
    
    let self = this;
    Api.get('/users')
      .then(response => self.setState({ users: response.data }));
  }
  
  profilePreview(user) {
    return (
      <div className="container" key={user.id}>
        <a href={'/profile/' + user.id}>
          <h2 className="title">{user.name}</h2>
          <img className="avatar" src={user.imageUrl ? user.imageUrl : Api.ALT_AVATAR_LINK} alt="avatar"/>
        </a>
      </div>
    );
  }
  
  render() {
    return (
      <div>
        <HeaderForm />
        <h2 className="title">All Users</h2>
        {this.state.users.map(this.profilePreview)}
      </div>
    );
  }
}
    
