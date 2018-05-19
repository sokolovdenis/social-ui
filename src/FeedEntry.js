import React, {Component} from 'react';
import './Feed.css'

class FeedEntry extends Component {
    render() {
        return (
            <div>
                Entry by {this.props.data.user.name} on {this.props.data.dateTime}
                <div><img src={this.props.data.imageUrl} width="100px" alt="Post" /></div>
                <div>{this.props.data.text}</div>
            </div>
        );
    }
}

export default FeedEntry;
