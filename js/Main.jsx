import React from "react";

import Profile from "./Profile";
import Post from "./Post";
import Person from "./Person";

import {Redirect} from 'react-router-dom';

export default class Main extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			page: "my_page",
			get_users: true
		};
	}

	get_users() {
		this.props.api.get('/users').
		then((function (response) {
			if (response.status == 200) {
				this.setState({
					all_users: response.data
				});
			}
		}).bind(this));
	}

	render() {

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

					{this.state.page == "all_users" && this.state.all_users &&
							<div className="friends_cnt_label"><b>{this.state.all_users.length}</b> друзей</div>
							{this.state.all_users.map((friend, i) =>
							<Person key={i}
								photo={friend.imageUrl || "static/no-user.png"}
								name={friend.name}
								age={this.get_age(friend.birthday)}
							/>)}
						}

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