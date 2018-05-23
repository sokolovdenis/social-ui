import React from 'react';
import Api from '../Api'
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
            posts: [],
            thereWillBeMore: true,
            skip: 0,
            count: 10
        };

    }

    async loadMore() {
        const userId = this.props.userId;
        const posts = await Api.getUserPosts(userId, this.state.skip, this.state.count);

        if (posts.length < this.state.count) {
            this.setState({ thereWillBeMore: false })
        }
        const skip = this.state.skip + posts.length;
        this.state.posts = this.state.posts.concat(posts);

        this.setState({
            isReady: true,
            posts: this.state.posts,
            skip
        });
    }

    async componentDidMount() {
        const userId = this.props.userId;
        const userInfo = await Api.getUser(userId);
        const followers = await Api.getUsersFollowers(userId);
        const followings = await Api.getUsersFollowings(userId);

        this.setState({
            isReady: true,
            userInfo,
            followers,
            followings,
        });

        await this.loadMore();
    }

    render() {
        if (!this.state.isReady) {
            return (<Loading />);
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
                    <PostList items={ this.state.posts } onLoadMore={ () => this.loadMore() } thereWillBeMore={ this.state.thereWillBeMore }/>
                </div>

                <div className="right-fake"></div>
            </div>
        );
    }

    onPostCreated(created) {
        if (created) {
            let {posts} = this.state;
            posts.unshift(created);
            this.setState({ posts: this.state.posts });
        }
    }
}

export default UserProfile;