import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import Fetch from './Fetch';
import Followers from './Followers';
import FollowButton from './FollowButton';
import Feed from './Feed';

import './Profile.css';

function getAge(birthday) {
    let date = new Date(birthday);
    let ageDiff = new Date(Date.now() - date.getTime());
    return Math.abs(ageDiff.getUTCFullYear() - 1970);
}

const mapStateToProps = state => ({
    token: state.token,
    currentUserId: state.currentUserId,
});

function getAvatar(user) {
    console.log(user.imageUrl);
    if (user.imageUrl) {
        return user.imageUrl;
    }
    return '/icons/default-avatar.png';
}

const ProfileBase = ({data, isLoading, error, currentUserId}) => {

    const profile = data;

    if (error) {
        return (
            <div className="global-error global-info">{error.message}</div>
        )
    }

    if (isLoading) {
        return (
            <div className="global-info">Loading...</div>
        )
    }

    return (
        <div className="global-flex">
            <section className="person-block">
                <div className="global-avatar avatar">
                    <img src={getAvatar(profile)} className="global-avatar-image avatar-image" alt="Avatar" />
                </div>
                <div className="info">
                    <div className="name">
                        {profile.name}
                    </div>
                    <div className="global-text city">
                        {getAge(profile.birthday)} years<br/>
                        {String(currentUserId) === String(profile.id) ?
                            <Link to={`/edit`} className="edit-link">Edit my profile</Link> :
                            ''}<br/>
                        <FollowButton userId={profile.id} /><br/>
                    </div>
                    <div className="message">
                        <img src="/icons/ic_comment.png" className="message-icon" alt="" />
                        <span className="message-text">
                            {profile.info}
                        </span>
                    </div>
                </div>

                <Followers userId={profile.id} type='followers' />
                <Followers userId={profile.id} type='followings' />

            </section>

            <Feed userId={profile.id} type='wall' />

        </div>
    );
};


class Profile extends Component {
    render() {
        let FetchedComponent = Fetch('GET', `users/${this.props.match.params.number}`,
            {token: this.props.token, currentUserId: this.props.currentUserId})(ProfileBase);
        return <FetchedComponent />
    }
}

export default connect(mapStateToProps)(Profile);
