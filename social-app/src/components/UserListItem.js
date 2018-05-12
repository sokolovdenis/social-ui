import React from 'react';
import { Link } from 'react-router-dom'

import UserStatistics from './UserStatistics'
import FollowUnfollowButton from './FollowUnfollowButton'

import './UserListItem.css'
import default_userpic from '../assets/default_userpic.jpg';

class UserListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    render() {
        if (!this.props.user) {
            return null;
        }
        let { id, imageUrl, name, info } = this.props.user;

        const postCount = this.props.posts ? this.props.posts.length : "?";
        const followersCount = this.props.followers ? this.props.followers.length : "?";
        const followingsCount = this.props.followings ? this.props.followings.length : "?";

        const isItMe = this.props.me && this.props.me.id == id;

        return (
            <div className="user-list-item">
                <Link to={`/users/${id}`}>
                    <ProfilePicture src={ imageUrl } />
                </Link>
                <div className="user-list-item-right">
                    <Link to={`/users/${id}`} className="user-list-item-name">{ name }</Link>
                    <p className="">{ info }</p>
                    <FollowUnfollowButton me={this.props.me} userId={ id }/>
                </div>
            </div>
        );
    }
}

function InteractionButton(props) {
    if (props.isItMe) {
        return (<div onClick={ (event) => props.editHandler() } className="profile-interact button">Edit</div>);
    } else {
        return (<div onClick={ (event) => props.toggleSubscriptionHandler() } className="profile-interact button">Subscribe</div>);
    }
}

function ProfilePicture(props) {
    const src = props.src ? props.src : default_userpic;
    return (
        <img className="user-list-item-profile-pic" src={src} />
    );
}

export default UserListItem;