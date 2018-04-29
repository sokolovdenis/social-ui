import React from 'react';
import Api from '../api'
import UserInfo from './user_info'
import PostList from './post_list'
import Loading from './loading'

import '../style.css'
import './user_profile.css'

class UserProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            isReady: false,
            user: {},
            stats: {},
            followers: [],
            followings: [],
            posts: []
        };
    }

    componentDidMount() {
        const userId = this.props.userId;
        let state = {
            isReady: false,
            user: {},
            stats: {},
            followers: [],
            followings: [],
            posts: []
        };
        
        let apiCalls = [
            Api.getUser(userId)
            .then(user => {
                state.user = user;
                this.setState(state);
            }),

            Api.getUserPosts(userId)
            .then(posts => {
                state.posts = posts;
                state.stats.postsCount = posts.length;
                this.setState(state);
            }),

            Api.getUsersFollowers(userId)
            .then(followers => {
                state.followers = followers;
                state.stats.followersCount = followers.length;
                this.setState(state);
            }),

            Api.getUsersFollowings(userId)
            .then(followings => {
                state.followings = followings;
                state.stats.followingsCount = followings.length;
                this.setState(state);
            })
        ];
        Promise.all(apiCalls)
            .then(() => {
                console.log(this.state);
                state.isReady = true;
                this.setState(state);
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
        return (
            <div className="page-content">
                <UserInfo user={ this.state.user }  stats={ this.state.stats }/>

                <div class="main-container">
                    <PostList items={ this.state.posts } />
                </div>

                <div class="right-fake"></div>
            </div>
        );
    }
}

export default UserProfile;