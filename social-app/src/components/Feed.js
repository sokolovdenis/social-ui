import React from 'react';

import Api from '../api'

import UserInfo from './UserInfo'
import PostList from './PostList'
import Loading from './Loading'
import CreatePost from './CreatePost'

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            feed: [],
            posts: [],
            thereWillBeMore: true,
            skip: 0,
            count: 10
        }
    }

    async loadMore() {
        const me = this.props.me.myInfo;

        // todo: remove post count term at all
        const posts = await Api.getUserPosts(me.id, 0, this.state.count);
        const feed = await Api.getUserFeed(me.id, this.state.skip, this.state.count);

        if (feed.length < this.state.count) {
            this.setState({
                thereWillBeMore: false
            })
        }

        const skip = this.state.skip + feed.length;
        this.state.feed = this.state.feed.concat(feed);

        this.setState({
            posts,
            feed: this.state.feed,
            skip
        });
    }

    async componentDidMount() {
        const me = this.props.me.myInfo;

        const followers = await Api.getUsersFollowers(me.id);
        const followings = await Api.getUsersFollowings(me.id);

        await this.loadMore();

        this.setState({
            followers,
            followings,
            isReady: true
        });
    }

    async onPostCreated(created) {
        if (created) {
            // let { feed } = this.state;
            // feed.unshift(created);
            // this.setState({
            //     feed: this.state.feed
            // });
        }
    }

    render() {
        if (!this.state.isReady) {
            return (<Loading />)
        }

        return (
            <div className="page-content" >
                <UserInfo userInfo={this.props.me.myInfo}
                    followings={this.state.followings}
                    followers={this.state.followers}
                    posts={this.state.posts}
                    me={this.props.me} />

                <div class="main-container">
                    <CreatePost onPostCreated={ (created) => this.onPostCreated(created) }/>
                    <PostList items={this.state.feed} onLoadMore={ () => this.loadMore() } thereWillBeMore={ this.state.thereWillBeMore }/>
                </div>

                <div class="right-fake"></div>
            </div>
        );
    }
}

export default Feed;