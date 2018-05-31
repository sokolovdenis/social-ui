import React, {Component} from 'react'

import './components.css';


class Post extends Component {
    render() {
        let post_image = <div className="fake_img" style={{height: "200px"}}>Image</div>;
        if (this.props.postDetails.imageUrl != null) {
            post_image =
                <img alt="" src={this.props.postDetails.imageUrl} style={{maxHeight: "300px", maxWidth: "500px"}}/>;
        }

        return (
            <div className="post">
                <div className="post_image">{post_image}</div>
                <div className="post_text">{this.props.postDetails.text}</div>
                <div className="post_details">POST_ID: {this.props.postDetails.id} // POST_DATE: {this.props.postDetails.dateTime}</div>
            </div>
        );
    }

}

export default Post