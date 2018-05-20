import React from 'react';
import { browserHistory } from 'react-router';
import Api from './api';
import HeaderForm from './header';

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    if (!Api.getAuthToken()) {
      browserHistory.push('/login');
    }
    this.state = {
      id: props.params.id,
      name: 'Unknown Anonymous',
      info: 'this user doesn\'t exist or you have no access',
      imageUrl: null,
      birthday: '0000-00-00',
      followers: 0,
      followings: 0,
      userId: -1,
      isFollowed: false
    };
    let self = this;
    Api.get('/users/me')
      .then(response => {
        self.setState({ userId: response.data.id })
        if (self.state.id !== response.data.id) {
          Api.get('/users/' + self.state.userId + '/followings')
            .then(response => {
              if (response.data.find(user => user.id === self.state.id)) {
                self.setState({ isFollowed: true });
              } else {
                self.setState({ isFollowed: false });
              }
            });
        }
      });
    Api.get('/users/' + self.state.id)
      .then(response => self.setState(response.data))
      .catch(err => self.setState({ id: false }));
    Api.get('/users/' + self.state.id + '/followers')
      .then(response => self.setState({ followers: response.data.length }));
    Api.get('/users/' + self.state.id + '/followings')
      .then(response => self.setState({ followings: response.data.length }));
    
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }
  
  follow(event) {
    let self = this;
    Api.post('/users/me/followings/' + self.state.id)
      .then(response => self.setState({ isFollowed: true, followers: self.state.followers + 1 }));
  }
  
  unfollow(event) {
    let self = this;
    Api.delete('/users/me/followings/' + self.state.id)
      .then(response => self.setState({ isFollowed: false, followers: self.state.followers - 1 }));
  }
  
  editProfile(event) {
    browserHistory.push('/editprofile');
  }
  
  actionButton() {
    if (this.state.id === this.state.userId) {
      return (
        <button onClick={this.editProfile}>
          Edit Profile
        </button>
      );
    } else if (this.state.isFollowed) {
      return (
        <button onClick={this.unfollow}>
          Unfollow User
        </button>
      );
    } else {
      return (
        <button onClick={this.follow}>
          Follow User
        </button>
      );
    }
  }
  
  convertBirthday() {
    let birthday = new Date(this.state.birthday);
    let nowday = new Date();
    var age = nowday.getFullYear() - birthday.getFullYear();
    if (nowday.getMonth() < birthday.getMonth()
        || (nowday.getMonth() == birthday.getMonth() && nowday.getDay() < birthday.getDay())) {
      age = age - 1;
    }
    return this.state.birthday.substring(0, 10) + ' (' + age + ' years)';
  }

  render() {
    return (
      <div>
        <HeaderForm />
        <h2 className="title">{this.state.name}</h2>
        <div className="container">
          <img className="avatar" src={this.state.imageUrl ? this.state.imageUrl : Api.ALT_AVATAR_LINK} alt="avatar"/>
          <br/>
          {this.state.info}
          <br/>
          Born: 
          {' ' + this.convertBirthday()}
          <div>
            <div className="inline-box">
              followers<br/><span className="big-number">{this.state.followers}</span>
            </div>
            <div className="inline-box">
              followings<br/><span className="big-number">{this.state.followings}</span>
            </div>
          </div>
          {this.actionButton()}
        </div>
        <h2 className="title">User Posts</h2>
      </div>
    );
  }
}
