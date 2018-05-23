import React from 'react';
import { Link } from 'react-router-dom'

import Api from '../Api'

import UserStatistics from './UserStatistics'
import EditSelf from './EditSelf';
import FollowUnfollowButton from './FollowUnfollowButton';

import "./UserInfo.css"
import default_userpic from '../assets/default_userpic.jpg';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userInfo,
            editing: false
        };
    }

    render() {
        let { id, imageUrl, name, info } = this.state.user;

        const postCount = this.props.posts.length;
        const followersCount = this.props.followers.length;
        const followingsCount = this.props.followings.length;

        const isItMe = this.props.me.myInfo.id === id;

        if (this.state.editing) {
            return (<EditSelf 
                        userInfo={this.state.user}
                        me={this.props.me}
                        onFinishEditing={(data) => this.onFinishEditing(data) }
                        onCancelEditing={(data) => this.onCancelEditing(data) } />);
        }

        let interactionButton = isItMe ?
            (<div onClick={ (event) => this.edit() } className="profile-interact button">Edit</div>) :
            (<FollowUnfollowButton me={this.props.me} userId={id} />);

        return (
            <div className="profile-container">
                <ProfilePicture src={ imageUrl }/>
                <div className="profile__bottom">
                    <Link to={`/users/${id}`} className="profile__name">{ name }</Link>
                    <UserStatistics
                        id={ id }
                        postCount={ postCount }
                        followersCount={ followersCount }
                        followingsCount={ followingsCount }
                    />
                    <div className="profile-about">{ info }</div>
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

    async onFinishEditing(data) {
        let updatedUser = await Api.editMyself({
            name: data.user.name,
            info: data.user.info,
            birthday: data.user.birthday
        });

        if (data.imageFile) {
            updatedUser = await Api.setProfileImage(data.imageFile);
        }

        this.setState({
            user: updatedUser, 
            editing: false
        });

        this.props.onSelfUpdated(updatedUser);
    }

    onCancelEditing() {
        this.setState({ editing: false })
    }
}

function ProfilePicture(props) {
    const src = props.src ? props.src : default_userpic;
    return (
        <img className="profile-pic" src={src} alt="profile pic" />
    );
}

export default UserInfo;