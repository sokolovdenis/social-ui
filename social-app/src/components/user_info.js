import React from 'react';
import { Link } from 'react-router-dom'

import Api from '../api'

import UserStatistics from './UserStatistics'
import EditSelf from './EditSelf';
import FollowUnfollow from './FollowUnfollowButton'

import default_userpic from '../assets/default_userpic.jpg';
import FollowUnfollowButton from './FollowUnfollowButton';

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
        //const isItFollowing = this.props.me.followings.map(item => item.id).includes(this.props.userInfo.id);

        let interactionButton;
        if (isItMe) {
            interactionButton = (<div onClick={ (event) => this.editHandler() } className="profile-interact button">Edit</div>);
        } else {
            interactionButton = (<FollowUnfollowButton me={this.props.me} userId={id} />)
        }

        return (
            <nav id="state-is-view-other" class="profile-container">
                <ProfilePicture src={ imageUrl }/>
                <div class="profile__bottom">
                    <Link to={`/users/${id}`} class="profile-name">{ name }</Link>
                    <UserStatistics
                        id={ id }
                        postCount={ postCount }
                        followersCount={ followersCount }
                        followingsCount={ followingsCount }
                    />
                    {
                        this.props.showDetailed ?
                        (<div>
                            <div className="profile-age">21 years</div>
                            <div className="profile-about">{info}</div>
                            { interactionButton }
                        </div>) : null
                    }
                </div>
            </nav>
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