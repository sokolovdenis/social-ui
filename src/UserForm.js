import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './css/style.css';
import './css/login.css';

class UserForm extends Component {  
  constructor(props) {
    super(props)
    
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordCopy: "",
      birthday: "",
      avatarPath: ""
    }

    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(event) {
    this.props.onSubmit(this.state);
  }
  
  render() {
    return(
            <form action="" method="post" className="form-horizontal" onSubmit={this.onSubmit}>

                <div className="form">


                    <div className="form-group">
                        <div className="">
                            <label className="username-lbl"
                                   aria-invalid="false">
                                Логин</label>
                            <input type="text" name="username" className="username"
                                   size="25" required=""
                                   aria-required="true" autoFocus="" value={this.state.name}
                                   onChange={(e) => this.setState({name: e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="">
                            <label className="password-lbl">
                                Пароль</label>
                            <input type="password" name="password" className="password"
                                   size="25" maxLength="99"
                                   required="" aria-required="true" value={this.state.password}
                                   onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="">
                            <label className="password2-lbl">
                                Повторите пароль</label>
                            <input type="password" name="password2" className="password2"
                                   size="25" maxLength="99"
                                   required="" aria-required="true" value={this.state.passwordCopy}
                                   onChange={(e) => this.setState({passwordCopy: e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="">
                            <label className="date-lbl"
                                   aria-invalid="false">
                                Дата рождения</label>
                            <input type="date" date="date" className="date"
                                   size="25" required=""
                                   aria-required="true" autoFocus="" value={this.state.birthday}
                                   onChange={(e) => this.setState({birthday: e.target.value})}/>
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="">
                            <label className="email-lbl"
                                   aria-invalid="false">
                                E-mail</label>
                            <input type="text" name="email" className="email"
                                   size="25" required=""
                                   aria-required="true" autoFocus="" value={this.state.email}
                                   onChange={(e) => this.setState({email: e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="">
                            <label className="ava-lbl"
                                   aria-invalid="false">
                                Аватар</label>
                            <div className="ava">
                              <input type="text" name="ava" className="ava"
                                   size="25" required=""
                                   aria-required="true" autoFocus="" value={this.state.avatarPath}
                                   onChange={(e) => this.setState({avatarPath: e.target.value})}/>
                              <button type="submit" className="button">Выбрать</button>
                            </div>
                        </div>
                                
                    </div>

                    <div className="form-group">
                        <div className="">
                            <label className="about-lbl"
                                   aria-invalid="false">
                                О себе</label>
                            <textarea type="text" name="about" className="about"
                                   size="25" required=""
                                      aria-required="true" autoFocus=""></textarea>
                        </div>
                    </div>

                    <br/>
                    <br/>
                    <div className="form-group">
                        <div className="registration">
                            <button type="submit" className="button">{this.props.title}</button>
                        </div>
                    </div>
                </div>

            </form>);
  }
}

export default UserForm
