
import React from "react";
import {HashRouter, Route, Switch} from 'react-router-dom';
import Root from './Root';
import Main from './Main';
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
		};
		console.log(localStorage.getItem('token'));

		if (localStorage.getItem('token') !== null) {
			this.state.api.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
		}
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

					
					<Route path="/home" 
						render={() => 
							<Main api={this.state.api}/>
						}/> 
				</Switch>
			</HashRouter>
		);
	}
}

