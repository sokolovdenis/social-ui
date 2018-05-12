import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Api from './api'

import Header from './components/Header'
import PostList from './components/post_list'
import SignIn from './components/signin'
import Feed from './components/Feed'
import UserProfile from './components/user_profile'
import AllUsers from './components/AllUsers'
import Followers from './components/Followers'
import Followings from './components/Followings'

import './style.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAutheticated: false,
      me: {}
    };
  }

  componentDidMount() {
    if (Api.getToken()) {
      this.onAuthenticated();
    }
  }

  async onAuthenticated() {
    const myInfo = await Api.getMyself();
    const followers = await Api.getUsersFollowers(myInfo.id);
    const followings = await Api.getUsersFollowings(myInfo.id);

    this.setState({
      isAutheticated: true,
      me: {
        myInfo,
        followers,
        followings
      }
    });
  }

  render() {
    if (!this.state.isAutheticated) {
      return (<SignIn onAuthenticatedHandler={ () => this.onAuthenticated() }/>);
    }

    return (
      <Router>
        <div className="page">
          <Header/>
          <main className="body-container">
            <Switch>
              <Route exact path="/users" render={ () => (<AllUsers me={this.state.me} />) } />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/" render={() => (<Feed me={this.state.me} />)} />
              <Route exact path="/users/:userId" render={({match}) => (
                <UserProfile userId={ match.params.userId } me={ this.state.me } />
              )} />

              <Route path="/users/:userId/followers" render={({match}) => (
                <Followers id={ match.params.userId } me={this.state.me} />
              )} />

              <Route path="/users/:userId/followings" render={({match}) => (
                <Followings id={ match.params.userId } me={this.state.me} />
              )} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;