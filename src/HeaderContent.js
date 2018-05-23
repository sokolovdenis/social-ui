import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, unauthenticate } from './auth.js'
import { setAuth, updateCurrentUser } from './actions'
import './css/style.css'
import './css/header.css'

class HeaderContent extends Component {  
  constructor(props) {
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
  }
  
  logout() {
    unauthenticate();
    this.props.setAuth(false);
    this.props.history.push('/signin');
  }
  
  componentDidMount() {
    if(isAuthenticated()) {
        this.props.updateCurrentUser();
    }
  }
  
  render() {        
    const username = this.props.username;
    const uid = this.props.uid;
    if(isAuthenticated()) {
      return (
        <ul>
          <li className="current_page_item"><Link to="/">Лента</Link></li>
          <li><Link to="/search">Поиск</Link></li>
          <li><Link to={"/user/"+uid}>{username}</Link></li>
          <li><button onClick={this.logout}>Выход</button></li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li><Link to="/register">Регистрация</Link></li>
          <li><Link to="/signin">Вход</Link></li>
        </ul>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  uid: state.user.uid,
  username: state.user.username
});

const mapDispatchToProps = {
  setAuth,
  updateCurrentUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContent));
