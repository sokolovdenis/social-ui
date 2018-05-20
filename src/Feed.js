import React, {Component} from 'react';

import Fetch from './Fetch';
import AddPost from './AddPost';
import {connect} from "react-redux"
import {Link} from 'react-router-dom';

import './Feed.css';

const mapStateToProps = state => ({
    token: state.token
});

function formatDate(date) {
    let dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();

    function leadingZeros(value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    }

    day = leadingZeros(day);
    month = leadingZeros(month);
    hours = leadingZeros(hours);
    minutes = leadingZeros(minutes);

    return `${hours}:${minutes} ${day}.${month}.${year}`
}

function getAvatar(user) {
    if (user.imageUrl) {
        return user.imageUrl;
    }
    return '/icons/default-avatar.png';
}

const FeedBase = ({data, isLoading, error, userId, type}) => {

    const posts = data;

    if (error) {
        return (
            <div className="global-error global-info">{error.message}</div>
        )
    }

    if (isLoading || userId == null) {
        return (
            <div className="global-info">Loading...</div>
        )
    }

    if (posts.length === 0 && type === 'feed') {
        return (
            <div className="global-info">
                Your feed seems to be empty. Go to
                <Link to='/users' className="feed-link"> user list </Link>
                and follow someone.
            </div>
        )
    }

    return (
        <div>
            {posts.map(post =>
            <div key={post.id} className="feed-entry">
                <div className="global-header feed-entry-header">
                    <span className="feed-entry-author">
                        <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
                    </span>
                    <span className="global-text feed-entry-date">{formatDate(post.dateTime)}</span>
                    <br/>
                </div>
                <div className="feed-entry-post">
                    <img src={getAvatar(post.user)} className="feed-entry-avatar" alt="Post" />
                    <div className="global-text feed-entry-text">
                        {post.text}
                        {post.imageUrl ?
                            <img src={post.imageUrl} className="feed-entry-image" width="100px" alt="Post" />
                            : ''
                        }
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

class Feed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasNewPost: false,
        };

        this.update = this.update.bind(this);
    }

    update() {
        // Just to update component
        this.setState({hasNewPost: true});
        this.setState({hasNewPost: false});
    }

    render() {
        let FetchedComponent = Fetch('GET', `users/${this.props.userId}/posts/${this.props.type}`,
            {token: this.props.token, userId: this.props.userId, type: this.props.type})(FeedBase);

        if (this.props.type === 'wall') {
            return (
                <div className="wall-block">
                    <AddPost userId={this.props.userId} callback={this.update} />
                    <div className="wall-block-scroll">
                        <FetchedComponent />
                    </div>
                </div>
            )
        }

        return (
            <div className="feed-block">
                <div className="feed-block-scroll">
                    <FetchedComponent />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Feed);
