import React from "react";
import {Redirect} from 'react-router-dom';

export default class Root extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
			login: true,
			redirect: false
	    };

	    this.handleLogin = this.handleLogin.bind(this);
	    this.handleRegister = this.handleRegister.bind(this);
	}

	handleRegister() {
		this.props.api.post('/identity/signup',
    	JSON.stringify({
    		email: this.state.email,
    		password: this.state.password,
    		name: this.state.name,
    		birthday: new Date(this.state.birthday).toDateString()
		}))
		.then((function (response) {
			if (response.status == 200) {
				this.props.set_user(response.data.token);
				this.setState({redirect: true});
				localStorage.setItem('token', response.data.token);
			}
	    }).bind(this))
	}

	handleLogin() {
		this.props.api.post('/identity/signin',
    	JSON.stringify({
    		email: this.state.email,
    		password: this.state.password
		}))
		.then((function (response) {
			if (response.status == 200) {
				this.props.set_user(response.data.token);
				this.setState({redirect: true});
				localStorage.setItem('token', response.data.token);
			}
	    }).bind(this))
	}

  	render () {

  		if (this.state.redirect) {
  			return <Redirect to="/home"/>;
  		}

	    return (
		    <div>
				<header>
					<div className="title">SN</div>
				</header>
				<div className="main">
					<div className="left">
					</div>
					<div className="center">
					{this.state.login ?
						<div className="form">
							<input className="input" type="text" name="email" placeholder="Почта"
								onChange={(event) => this.setState({email: event.target.value})}
							/>
							<input className="input" type="password" name="password" placeholder="Пароль"
								onChange={(event) => this.setState({password: event.target.value})}
							/>
							<div className="input remember">
								<div>Запомнить меня</div>
								<input type="checkbox" name="remember"/>
							</div>
							<div 
								className="button login_button"
								onClick={this.handleLogin}>
								Войти</div>
							<button className="small_register" onClick={() => this.setState({login: false})}>
								Зарегистрироваться
							</button>
						</div>
					:

						<div className="form">
							<input className="input" type="text" name="email" placeholder="Почта"
								onChange={(event) => this.setState({email: event.target.value})}/>
							<input className="input" type="password" name="password" placeholder="Пароль"
								onChange={(event) => this.setState({password: event.target.value})}/>
							<input className="input" type="text" name="name" placeholder="Имя"
								onChange={(event) => this.setState({name: event.target.value})}/>
							<input className="input" type="text" name="birthday" placeholder="Дата рождения"
								onChange={(event) => this.setState({birthday: event.target.value})}/>
							<div 
								className="button register_button"
								onClick={this.handleRegister}>
								Зарегистрироваться
							</div>
							<button className="small_register" onClick={() => this.setState({login: true})}>
								Войти
							</button>
						</div>
					}
					</div>
					<div className="right">
					</div>
				</div>
				<footer>
					<div className="copyright">&copy; Evgeniya Tveritinova, 2018</div>
				</footer>
			</div>);
  }
}