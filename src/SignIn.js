import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loginAuth } from './actions'
import './css/style.css'
import './css/login.css'

class SignIn extends Component {  
  constructor(props) {
    super(props)
    
    this.state = {
      email: "",
      password: "",
      remember: false
    }
    
    this.onLogin = this.onLogin.bind(this);
  }
  
  onLogin(event) {
    event.preventDefault();
    this.props.loginAuth(this.state);
  }
  
  render() {
    return(
      <div className="login-wrap">

          <div className="login ">

              <form action="" method="post" className="form-horizontal" onSubmit={this.onLogin} >

                  <div className="form">
                      <div className="form-group">
                          <div className="">
                              <label className="username-lbl"
                                     aria-invalid="false">
                                  Логин
                              </label>
                              <input type="text" name="email" className="username"
                                         size="25" required=""
                                         aria-required="true" autoFocus=""
                                         value={this.state.email}
                                         onChange={(e) => {this.setState({email: e.target.value})}}/>
                          </div>
                      </div>
                      <div className="form-group">
                          <div className="">
                              <label className="password-lbl">
                                  Пароль</label>
                              <input type="password" name="password" className="password"
                                     size="25" maxLength="99"
                                     required="" aria-required="true"
                                     value={this.state.password}
                                     onChange={(e) => {this.setState({password: e.target.value})}}/>
                          </div>
                      </div>


                      <div className="form-group">
                          <div className="">
                              <div className="checkbox">
                                  <label>
                                      <input className="remember" type="checkbox"
                                             name="remember" 
                                             value={this.state.remember}
                                             onChange={(e) => {this.setState({remember: e.target.checked})}}/>
                                      <span>Запомнить меня</span>
                                  </label>
                              </div>
                          </div>
                      </div>

                      <div className="form-group">
                          <div className="in">
                              <button type="submit" className="button">Вход</button>
                          </div>
                      </div>
                  </div>

                  <div className="other-links form-group">
                      <div className="">
                          <ul>
                              <li>
                                  <a href="">
                                      Забали пароль?</a></li>
                              <li>
                                  <a href="">
                                      Забыли логин?</a></li>
                              <li>
                                  <Link to="/register">
                                      Нет аккаунта?</Link></li>
                          </ul>
                      </div>
                  </div>

              </form>

          </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  loginAuth
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn))
