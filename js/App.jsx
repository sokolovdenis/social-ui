
import React from "react";
import {HashRouter, Route, Switch, NavLink} from 'react-router-dom';
import Root from './Root';
import Profile from './Profile';
import Feed from './Feed';
import AllUsers from './AllUsers';
import axios from 'axios';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			api: axios.create({
				baseURL: 'https://social-webapi.azurewebsites.net/api',
				timeout: 10000,
				transformRequest: [(data) => data],
				headers: {
					'Accept': 'application/json,*/*',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}
			}),
			logged: false
		};
		console.log(localStorage.getItem('token'));

		if (localStorage.getItem('token') !== null) {
			this.state.api.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
			this.state.logged = true;
		}
	}

	get_age(birthday) {
		var diff =(new Date().getTime() - new Date(birthday).getTime()) / 1000;
		diff /= (60 * 60 * 24);
		return Math.abs(Math.floor(diff/365.25));
	}

	template(content) {

		if (!this.state.logged) {
			return <Redirect to="/"/>;
		}

		return (
			<div>
				<header>
					<div className="title">SN</div>
				</header>
				<div className="main">
					<div className="left">
						<div className="menu">
							<div className="menu_item button">
								<NavLink to='/my_page'
									style={{color: 'white'}} activeStyle={{'font-weight': 'bold', color: 'black'}}>
									Моя страница
								</NavLink>
							</div>
							<div className="menu_item button">
								<NavLink to='/feed'
									style={{color: 'white'}} activeStyle={{'font-weight': 'bold', color: 'black'}}>
								Лента</NavLink>
							</div>
							<div className="menu_item button">
								<NavLink to='/all_users'
									style={{color: 'white'}} activeStyle={{'font-weight': 'bold', color: 'black'}}>
								Все пользователи</NavLink>
							</div>
						</div>
					</div>
					<div className="center">
						{content}
					</div>
					<div className="right">
					</div>
				</div>
				<footer>
					<div className="copyright">&copy; Evgeniya Tveritinova, 2018</div>
				</footer>
			</div>
		);
	}

	render() {

		return (
			<HashRouter>
				<Switch>
					<Route exact path="/"
						render={() =>
							<Root set_user={(
								(token) => {
									this.state.api.defaults.headers.common['Authorization'] = 'Bearer '+token;
								}).bind(this)}
								api={this.state.api}/>
					}/>

					<Route path="/my_page" render={() => this.template(
						<Profile api={this.state.api}
							info_api_path="/users/me"
							get_age={this.get_age}
						/>)}/>
					<Route path="/feed" render={() => this.template(<Feed api={this.state.api}/>)}/>
					<Route path="/all_users" render={() => this.template(<AllUsers api={this.state.api}/>)}/>
				</Switch>
			</HashRouter>
		);
	}
}

