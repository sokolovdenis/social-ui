import React from 'react';
import { browserHistory } from 'react-router';
import Api from './api';

let ALT_AVATAR_LINK = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292048.jpg';

export default class ProfileForm extends React.Component {
  constructor(props) {
    if (!window.compactSocial.currentId) {
        //browserHistory.push('/login');
    }
    super(props);
    this.state = {
      id: false,
      name: 'Unknown Anonymous',
      info: 'you need to log in to view user info',
      imageUrl: '',
      birthday: 'never',
      followers: 0,
      followings: 0
    };
    let self = this;
    /*Api.get('/users/' + window.compactSocial.currentId)
      .then(response => self.setState(response.data))
      .catch(err => self.setState({ id: false }));*/
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>{this.state.name}</h2>
        <div className="container">
          <img className="avatar" src={this.state.imageUrl ? this.state.imageUrl : ALT_AVATAR_LINK} alt="avatar"/>
          <br/>
          {this.state.info}
          <br/>
          Born:
          {this.state.birthday.substring(0, 10)}
          <div style={{ alignContent: 'center' }}>
            <div className="inline-box">
              followers:<br/><span className="big-number">{this.state.followers}</span>
            </div>
            <div className="inline-box">
              followings:<br/><span className="big-number">{this.state.followings}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
