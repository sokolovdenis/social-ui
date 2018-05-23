import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Api from './Api'

import Header from './components/Header'
import SignIn from './components/SignIn'
import Feed from './components/Feed'
import UserProfile from './components/UserProfile'
import AllUsers from './components/AllUsers'
import Followers from './components/Followers'
import Followings from './components/Followings'
import Loading from './components/Loading';
import JumpUp from './components/JumpUp';

import './style.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAutheticated: false,
      isReady: false,
      me: {}
    };
  }

  componentDidMount() {
    if (Api.getToken()) {
      this.onAuthenticated();
    }
  }

  async onAuthenticated() {
    this.setState({ isAutheticated: true });
    const myInfo = await Api.getMyself();
    const followers = await Api.getUsersFollowers(myInfo.id);
    const followings = await Api.getUsersFollowings(myInfo.id);

    this.setState({
      isReady: true,
      me: {
        myInfo,
        followers,
        followings
      }
    });
  }

  onSignOut() {
    Api.signOut();
    this.setState({ isAutheticated: false, isReady: false });
  }

  render() {
    if (!this.state.isAutheticated) {
      return (<SignIn onAuthenticatedHandler={ async () => await this.onAuthenticated() }/>);
    }

    if (!this.state.isReady) {
      return <Loading />;
    }

    return (
      <Router>
        <div className="page" id="top">
          <JumpUp anchor = '#top'/>
          <Header me={ this.state.me } onSignOut={() => this.onSignOut()} />
          <main className="body-container">
            <Switch>
              <Route exact path="/users" render={ () => (<AllUsers me={this.state.me} />) } />
              <Route exact path="/" render={ () => (<Feed me={this.state.me} />) } />
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