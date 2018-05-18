import React from 'react';
import { Link } from 'react-router-dom'

import Api from '../api'

import UserStatistics from './UserStatistics'
import EditSelf from './EditSelf';
import FollowUnfollowButton from './FollowUnfollowButton';

import "./UserInfo.css"
import default_userpic from '../assets/default_userpic.jpg';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    render() {
        if (!this.props.userInfo || !this.props.me) {
            return null;
        }
        let { id, imageUrl, name, info } = this.props.userInfo;

        const postCount = this.props.posts ? this.props.posts.length : "?";
        const followersCount = this.props.followers ? this.props.followers.length : "?";
        const followingsCount = this.props.followings ? this.props.followings.length : "?";

        const isItMe = this.props.me && this.props.me.myInfo.id == id;

        if (this.state.editing) {
            return (<EditSelf 
                        userInfo={this.props.userInfo}
                        me={this.props.me}
                        onFinishEditing={(data) => this.onFinishEditing(data) }
                        onCancelEditing={(data) => this.onCancelEditing(data) } />);
        }

        let interactionButton = isItMe ?
            (<div onClick={ (event) => this.edit() } className="profile-interact button">Edit</div>) :
            (<FollowUnfollowButton me={this.props.me} userId={id} />);

        return (
            <div class="profile-container">
                <ProfilePicture src={ imageUrl }/>
                <div class="profile__bottom">
                    <Link to={`/users/${id}`} class="profile-name">{ name }</Link>
                    <UserStatistics
                        id={ id }
                        postCount={ postCount }
                        followersCount={ followersCount }
                        followingsCount={ followingsCount }
                    />
                    <div className="profile-about">{(info)? info : ""}</div>
                    {
                        this.props.showDetailed ?
                        (<div>
                            { interactionButton }
                        </div>) : null
                    }
                </div>
            </div>
        );
    }

    edit() {
        this.setState({ editing: true })
    }

    onFinishEditing(data) {
        Api.editMyself({
            name: data.user.name,
            info: data.user.info,
            birthday: data.user.birthday
        }).then((updated) => {
            console.log(updated);
            if (data.imageFile) {
                return Api.setProfileImage(data.imageFile);
            }
            return Promise.resolve(updated);
        }).then((updated) => {
            this.setState({ editing: false });
        })
    }

    onCancelEditing() {
        this.setState({ editing: false })
    }
}

function ProfilePicture(props) {
    const src = props.src ? props.src : default_userpic;
    return (
        <img className="profile-pic" src={src} />
    );
}

export default UserInfo;