import React from 'react';

import Api from '../api'

import UserStatistics from './UserStatistics'
import EditSelf from './EditSelf';

import default_userpic from '../assets/default_userpic.jpg';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    render() {
        if (!this.props.userInfo) {
            return null;
        }
        let { id, imageUrl, name, info } = this.props.userInfo;

        const postCount = this.props.posts ? this.props.posts.length : "?";
        const followersCount = this.props.followers ? this.props.followers.length : "?";
        const followingsCount = this.props.followings ? this.props.followings.length : "?";

        const isItMe = this.props.me && this.props.me.id == id;

        if (this.state.editing) {
            return (<EditSelf 
                        userInfo={this.props.userInfo}
                        me={this.props.me}
                        onFinishEditing={(data) => this.onFinishEditing(data) }
                        onCancelEditing={(data) => this.onCancelEditing(data) } />);
        }

        return (
            <nav id="state-is-view-other" class="profile-container">
                <ProfilePicture src={ imageUrl }/>
                <div class="profile__bottom">
                    <div class="profile-name">{ name }</div>
                    <UserStatistics
                        postCount={ postCount }
                        followersCount={ followersCount }
                        followingsCount={ followingsCount }
                    />
                    {
                        this.props.showDetailed ?
                        (<div>
                            <div className="profile-age">21 years</div>
                            <div className="profile-about">{info}</div>
                            <InteractionButton 
                                isItMe={isItMe}
                                toggleSubscriptionHandler={ () => this.toggleSupscription() }
                                editHandler={ () => this.edit() } />
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

    toggleSupscription() {
        alert("Subscribe or unsubscribe");
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
        <img className="profile-pic" src={src} />
    );
}

export default UserInfo;