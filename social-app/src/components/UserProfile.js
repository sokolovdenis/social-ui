import React from 'react';
import Api from '../api'
import UserInfo from './UserInfo'
import PostList from './PostList'
import Loading from './Loading'
import CreatePost from './CreatePost'

import '../style.css'

class UserProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            isReady: false,
            userInfo: {},
            followers: [],
            followings: [],
            posts: []
        };
    }

    componentDidMount() {
        const userId = this.props.userId;

        let apiCalls = [
            Api.getUser(userId)
            .then(userInfo => {
                this.setState({ userInfo });
            }),

            Api.getUserPosts(userId)
            .then(posts => {
                this.setState({ posts });
            }),

            Api.getUsersFollowers(userId)
            .then(followers => {
                this.setState({ followers });
            }),

            Api.getUsersFollowings(userId)
            .then(followings => {
                this.setState({ followings });
            })
        ];
        Promise.all(apiCalls)
            .then(() => {
                console.log(this.state);
                this.setState({ isReady: true });
            })
            .catch(function (reason) {
                if (reason == Api.statusCodes.AuthenticationFailed ||
                    reason == Api.statusCodes.NoAccessToken) {
                    alert('Please sign in!');
                } else {
                    alert(Api.description(reason));
                }
            });
    }

    render() {
        if (!this.state.isReady) {
            return (<Loading />)
        }

        const isItMe = this.props.me.myInfo.id === this.state.userInfo.id
        const createPost = (isItMe) ?
            (<CreatePost onPostCreated={ (created) => this.onPostCreated(created) }/>) :
            null;

        return (
            <div className="page-content">
                <UserInfo
                    showDetailed={ true }
                    userInfo={ this.state.userInfo }
                    followings={ this.state.followings }
                    followers={ this.state.followers }
                    posts={ this.state.posts }
                    me={ this.props.me } />

                <div className="main-container">
                    { createPost }
                    <PostList items={ this.state.posts } />
                </div>

                <div className="right-fake"></div>
            </div>
        );
    }

    async onPostCreated(created) {
        if (created) {
            let {posts} = this.state;
            posts.unshift(created);
            this.setState({ posts: this.state.posts });
        }
    }
}

export default UserProfile;