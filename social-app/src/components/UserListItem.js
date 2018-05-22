import React from 'react';
import { Link } from 'react-router-dom'

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
        const { id, imageUrl, name, info } = this.props.user;
        const isItMe = this.props.me.myInfo.id == id;

        let followUnfollow = (!isItMe) ?
            (<FollowUnfollowButton me={this.props.me} userId={ id }/>) :
            (<div/>);

        return (
            <div className="user-list-item">
                <Link to={`/users/${id}`}>
                    <ProfilePicture src={ imageUrl } />
                </Link>
                <div className="user-list-item-right">
                    <Link to={`/users/${id}`} className="user-list-item-name">{ name }</Link>
                    <p className="">{ info }</p>
                    { followUnfollow }
                </div>
            </div>
        );
    }
}

function ProfilePicture(props) {
    const src = props.src ? props.src : default_userpic;
    return (
        <img className="user-list-item-profile-pic" src={src} />
    );
}

export default UserListItem;