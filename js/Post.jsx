import React from "react";

export default class Post extends React.Component {
	render() {
		return (
			<div className="post">
				<div className="post_author">
					<img src={this.props.author_photo || "static/no-user.png"} className="post_photo"/>
					<div className="post_name_date">
						<div className="post_name">{this.props.author_name}</div>
						<div className="post_date">{new Date(this.props.date).toDateString()}</div>
					</div>
				</div>
				<div className="post_content">
					{this.props.content}
					{this.props.post_photo &&
					<img src={this.props.post_photo} className="post_content_photo"/>}
				</div>
			</div>
		);
	}
}