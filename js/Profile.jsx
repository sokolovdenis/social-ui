import React from "react";

export default class App extends React.Component {
	render() {
		return (
			<div className="profile">
				<div className="profile_photo_sub">
					<img src={this.props.photo} className="profile_photo"/>
					<div className="subscribe_button button">Подписаться</div>
				</div>
				<div className="profile_info">
					<div className="profile_name">{this.props.name}</div>
					<div className="profile_age">Возраст: {this.props.age}</div>
					<div className="profile_status">{this.props.status}</div>
					<div className="profile_subs_container">
						<div>{this.props.followings} подписок</div>
						<div>{this.props.followers} подписчиков</div>
					</div>
				</div>
			</div>);
	}
}