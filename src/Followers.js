import React, {Component} from 'react';
import Fetch from './Fetch';
import {Link} from 'react-router-dom';

import './Followers.css';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    token: state.token
});

const FollowersBase = ({data, isLoading, error, type}) => {

    const followers = data;

    if (error) {
        return (
            <div className='Followers'>
                <div>{error.message}</div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='Followers'>
                <div>Loading...</div>
            </div>
        )
    }

    let header = type === 'followers' ? 'Followers' : 'Followings';

    return (
        <div className="Followers">
            {header} ({followers.length})<br />
            {followers.map(follower =>
                <div key={follower.id}>
                    <Link to={`/profile/${follower.id}`}>{follower.name}</Link>
                </div>
            )}
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
