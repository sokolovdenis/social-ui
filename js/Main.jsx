import React from "react";

import Profile from "./Profile";
import Post from "./Post";

import {Redirect} from 'react-router-dom';

export default class Main extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			page: "my_page"
		};
	}

	componentWillMount() {

		console.log("will mount");

		var state_dict = {};

		this.props.api.get('/users/me')
		.then((function (response) {
			if (response.status == 200) {

				var diff =(new Date().getTime() - new Date(response.data['birthday']).getTime()) / 1000;
				diff /= (60 * 60 * 24);
				var age = Math.abs(Math.floor(diff/365.25));

				state_dict.profile_photo = response.data.imageUrl;
				state_dict.profile_name = response.data.name;
				state_dict.profile_age = age;
				state_dict.profile_status = response.data.info;
				state_dict.me_id = response.data.id;

				this.props.api.get('users/'+state_dict.me_id+'/posts/wall')
		    	.then((function (response) {
					if (response.status == 200) {
						this.setState({
							posts: response.data
						});
					}
				}).bind(this))

				return this.props.api.get('/users/'+state_dict.me_id+'/followings');
			}
		}).bind(this))
		.then((function (response) {
			if (response.status == 200) {
				state_dict.profile_followings = response.data;
				return this.props.api.get('/users/'+state_dict.me_id+'/followers');
			}
		}).bind(this))
		.then((function (response) {
			if (response.status == 200) {
				state_dict.profile_followers = response.data;

				this.setState(state_dict);
			}
		}).bind(this))
		.catch((error) => {
			if (error.response.status === 401) {
				this.setState({redirect: true});
			}
    	});
	}

	render() {

		console.log(this.state);

		if (this.state.redirect) {
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
							<button className="menu_item button"
								onClick={(event) => this.setState({page: "my_page"})}
							>Моя страница</button>
							<button className="menu_item button"
								onClick={(event) => this.setState({page: "feed"})}
							>Лента</button>
							<button className="menu_item button"
								onClick={(event) => this.setState({page: "friends"})}
							>Мои друзья</button>
						</div>
					</div>
					<div className="center">

					{this.state.page === "my_page" && this.state.me_id && 
						<Profile
							photo={this.state.profile_photo || "static/no-user.png"}
							name={this.state.profile_name}
							age={this.state.profile_age}
							status={this.state.profile_status}
							followings={this.state.profile_followings.length}
							followers={this.state.profile_followers.length}
							/>}

					{this.state.page === "my_page" && this.state.posts &&
						this.state.posts.map((post, i) =>
						<Post
							author_photo={post.user.imageUrl}
							author_name={post.user.name}
							date={post.dateTime}
							content={post.text}
							post_photo={post.imageUrl}
						/>)}

					{this.state.page == "feed" && this.state.feed &&
						this.state.feed.map((post, i) =>
						<Post
							author_photo={post.user.imageUrl}
							author_name={post.user.name}
							date={post.dateTime}
							content={post.text}
							post_photo={post.imageUrl}
						/>)}

					{this.state.page == "friends" && }

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
}