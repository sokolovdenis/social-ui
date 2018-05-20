import React, {Component} from 'react';
import Fetch from './Fetch';
import {Link} from 'react-router-dom';

import './Followers.css';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    token: state.token
});

function getAvatar(user) {
    if (user.imageUrl) {
        return user.imageUrl;
    }
    return '/icons/default-avatar.png';
}

const FollowersBase = ({data, isLoading, error, type}) => {

    const followers = data;

    if (error) {
        return (
            <div className="followers">
                <br />
                <div className="global-error global-info">{error.message}</div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="followers">
                <br />
                <div className="global-info">Loading...</div>
            </div>
        )
    }

    let header = type === 'followers' ? 'Followers' : 'Followings';

    return (
        <div className="followers">
            <br />
            <div className="global-header followers-header">
                <div className="followers-header-text">
                    {header}
                </div>
                <div className="followers-header-counter">
                    {followers.length}
                </div>
                <br />
            </div>
            <div className="followers-block">
                {followers.map(follower =>
                    <div key={follower.id} className="followers-entry">
                        <Link to={`/profile/${follower.id}`}>
                            <div className="global-avatar followers-entry-avatar">
                                <img className="global-avatar-image followers-entry-avatar-image"
                                     src={getAvatar(follower)} alt="Avatar" />
                            </div>
                            <div className="global-text followers-entry-text">
                                {follower.name}
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

class Followers extends Component {

    render() {
        let FetchedComponent = Fetch('GET', `users/${this.props.userId}/${this.props.type}`,
            {'type': `${this.props.type}`, token: this.props.token})(FollowersBase);
        return (
            <div>
                <FetchedComponent />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Followers);
