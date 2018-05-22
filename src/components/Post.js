import React, {Component} from 'react'

import Moment from 'react-moment'

class Post extends Component {
    render() {
        const {imageUrl, dateTime, text} = this.props.info;

        let post_image = null;
        if (imageUrl !== null) {
            post_image = <img alt="" src={imageUrl} style={{maxHeight: "500px", width: "100%"}}/>;
        }
        return (
            <div className="post">
                <h5><Moment format="D MMMM YYYY">{dateTime}</Moment></h5>
                {post_image}
                <p>{text}</p>
            </div>
        );
    }
}

export default Post;
