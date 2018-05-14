import React, {Component} from 'react';
import {Link} from "react-router-dom";

import './post.css';

class PostComponent extends Component {
    render() {
        let user_image = "";
        if (this.props.post_details.user.imageUrl != null) {
            user_image = <img className="user_img" alt="" src={this.props.post_details.user.imageUrl}/>;
        }
        let post_image = "";
        if (this.props.post_details.imageUrl != null) {
            post_image = <img className="post_img" alt="" src={this.props.post_details.imageUrl}/>;
        }
        return (
            <div className="post">
                {user_image}
                <Link to={"/profile/"+this.props.post_details.user.id}>{this.props.post_details.user.name}</Link>
                <h5>{new Date(this.props.post_details.dateTime).toISOString()}</h5>
                {post_image}
                <p>{this.props.post_details.text}</p>
            </div>
        );
    }
}

export default PostComponent;