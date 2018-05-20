import React from 'react';
import { browserHistory } from 'react-router';
import Api from './api';
import HeaderForm from './header';

export default class ProfileEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      info: '',
      imageUrl: null,
      birthday: new Date()
    }
    
    let self = this;
    Api.get('/users/me')
      .then(response => self.setState(response.data));

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
    this.handleAvatarSubmit = this.handleAvatarSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  
  handleInfoChange(event) {
    this.setState({ info: event.target.value });
  }

  handleBirthdayChange(event) {
    this.setState({ birthday: event.target.value });
  }
  
  handleAvatarSubmit(event) {
    var data = new FormData();
    data.append('file', document.getElementById('avatar').files[0]);
    console.log('hmm');
    console.dir(data);
    let self = this;
    Api.put('/users/me/photo', data)
      .then(response => self.setState({ imageUrl: response.data.imageUrl}));
    event.preventDefault();
  }

  handleSubmit(event) {
    let self = this;
    Api.put('/users/me', self.state)
      .then(response => browserHistory.push('/profile/' + response.data.id));
    event.preventDefault();
  }
  
  handleDeleteProfile(event) {
    if (window.confirm('Are you sure? It will delete your profile and posts with no chance to be restored!')) {
      Api.delete('/users/me');
    }
    event.preventDefault();
  }
  
  render() {
    return (
      <div>
        <HeaderForm />
        <h2 className="title">Edit Your Profile</h2>
        <form className="container">
          <img className="avatar" src={this.state.imageUrl ? this.state.imageUrl : Api.ALT_AVATAR_LINK} alt="avatar"/>
          <br/>
          <label>
            Upload new avatar:
            <br/>
            <input type="file" id="avatar" accept="image/*"/>
          </label>
          <button type="button" onClick={this.handleAvatarSubmit}>Submit</button>
        </form>
        <br/>
        <form className="container" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" placeholder="username" value={this.state.name}
              onChange={this.handleNameChange} />
            <br/>
            Info:
            <input type="text" placeholder="few words about me" value={this.state.info}
              onChange={this.handleInfoChange} />
            <br/>
            Birthday:
            <input type="date" value={this.state.birthday}
              onChange={this.handleBirthdayChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <hr/>
        <div className="container warn">
          <button type="button" onClick={this.handleDeleteProfile}>Delete your profile</button>
          <br/>
          (It cannot be undone, really)
        </div>
      </div>
    );
  }
}
