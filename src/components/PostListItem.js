import React, {Component} from 'react';

/*
    Элемент списка постов (один пост)
 */

class PostListItem extends Component {
    render() {
        let post_image = <div className="fake_img" style={{height: "200px"}}>Image</div>;
        if (this.props.postDetails.imageUrl != null) {
            post_image =
                <img alt="" src={this.props.postDetails.imageUrl} style={{maxHeight: "300px", maxWidth: "500px"}}/>;
        }
        return (
            <div className="post">
                <h2>{this.props.postDetails.id}</h2>
                <h5>{this.props.postDetails.dateTime}</h5>
                {post_image}
                <p>{this.props.postDetails.text}</p>
            </div>
        );
    }
}

export default PostListItem;