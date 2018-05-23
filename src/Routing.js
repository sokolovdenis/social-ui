import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from './Posts.js';
import Search from './Search.js'
import User from './User.js'
import  Registration from './Registration.js'
import  SignIn from './SignIn.js'
import { isAuthenticated } from './auth.js'
import { setAuth } from './actions'

class Routing extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    const authenticated = isAuthenticated();
    this.props.setAuth(authenticated);
  }
  
  render() {
    const { auth } = this.props;
    return (        
      <div>
        <Route path="/" exact component={auth ? Posts : SignIn}/>
        <Route path="/search" component={auth ? Search : SignIn}/>
        <Route path="/user/:userId" component={auth ? User : SignIn}/>
        <Route path="/register" component={auth ? Posts : Registration}/>
        <Route path="/signin" component={auth ? Posts : SignIn}/>
      </div>
    );
    
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  setAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
