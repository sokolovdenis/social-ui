import React, {Component} from 'react';

import './Feed.css';
import Fetch from './Fetch';
import AddPost from './AddPost';
import FeedEntry from './FeedEntry';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    token: state.token
});

const FeedBase = ({data, isLoading, error}) => {

    const posts = data;

    if (error) {
        return (
            <div className='Feed'>
                <div>{error.message}</div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='Feed'>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className="Feed">
            {posts.map(post =>
                <div key={post.id}>
                    <FeedEntry data={post} />
                </div>
            )}
        </div>
    );
};

class Feed extends Component {
    render() {
        let FetchedComponent = Fetch('GET', `users/${this.props.userId}/posts/${this.props.type}`,
            {token: this.props.token})(FeedBase);
        return (
            <div>
                <AddPost currentUserId={this.props.userId} />
                <FetchedComponent />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Feed);
