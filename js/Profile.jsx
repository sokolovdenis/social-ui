import React from "react";

export default class Profile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentWillMount() {

		var state_dict = {};

		this.props.api.get(this.props.info_api_path)
		.then((function (response) {
			if (response.status == 200) {

				state_dict.profile_photo = response.data.imageUrl;
				state_dict.profile_name = response.data.name;
				state_dict.profile_age = this.props.get_age(response.data['birthday']);
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
	}

	render() {

		console.log(this.state);

		return (
		<div style={{width: '100%'}}>
			{this.state.profile_name ?
			<div className="profile">
				<div className="profile_photo_sub">
					<img src={this.state.profile_photo || "static/no-user.png"} className="profile_photo"/>
					<div className="subscribe_button button">Подписаться</div>
				</div>
				<div className="profile_info">
					<div className="profile_name">{this.state.profile_name}</div>
					<div className="profile_age">Возраст: {this.state.profile_age}</div>
					<div className="profile_status">{this.state.profile_status}</div>
					<div className="profile_subs_container">
						<div>{this.state.profile_followings.length} подписок</div>
						<div>{this.state.profile_followers.length} подписчиков</div>
					</div>
				</div>
			</div> : ''}

			{this.state.posts &&
			this.state.posts.map((post, i) =>
				<Post
					author_photo={post.user.imageUrl}
					author_name={post.user.name}
					date={post.dateTime}
					content={post.text}
					post_photo={post.imageUrl}
				/>)}
		</div>
		);
	}
}