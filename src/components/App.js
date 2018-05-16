import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'


import './App.css';
import Head from './Head'
import Feed from './Feed'
import Users from './Users'
import Login from './Login'
import Profile from './Profile'
import { logIn, logOut } from '../actions/auth'

class App extends Component {
  render() {  
    const userPath = "user/" + this.props.userId
    const body = this.props.isLoggedIn ? (
      <Switch>
        <Route exact path="/" render={() => (<Redirect to={userPath}/>)}/>
        <Route path='/feed' component={Feed} />
        <Route path='/users' component={Users} />
        <Route path='/user/:id' component={Profile} />
      </Switch>
    ) : (
      <Login call={this.props.logIn} />
    );

    return (
      <div className="App">
        <Head exitCall={this.props.logOut}/>
        {body}
        <footer>(с) футер </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { isLoggedIn: !!state.auth.id, userId: state.auth.id }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logIn: (token, setCookie) => {
        dispatch(logIn(token, setCookie));
      },
      logOut: () => {
        dispatch(logOut());
      }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
