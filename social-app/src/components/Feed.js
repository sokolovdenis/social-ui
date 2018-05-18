import React from 'react';

import Api from '../api'

import UserInfo from './UserInfo'
import PostList from './post_list'
import Loading from './loading'
import CreatePost from './CreatePost'

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            feed: [],
            posts: [],
            wall: []
        }
    }

    componentDidMount() {
        const me = this.props.me.myInfo;
        let apiCalls = [
            Api.getUserPosts(me.id)
                .then(posts => {
                    this.setState({ posts });
                }),

            Api.getUsersFollowers(me.id)
                .then(followers => {
                    this.setState({ followers });
                }),

            Api.getUsersFollowings(me.id)
                .then(followings => {
                    this.setState({ followings });
                }),

            Api.getUserFeed(me.id)
                .then(wall => {
                    this.setState({ wall });
                })
        ];
        return Promise.all(apiCalls)
            .then(() => {
                console.log(this.state);
                let feed = this.state.wall
                    .concat(this.state.posts)
                    .sort((a, b) => {
                        return Date.parse(b.dateTime) - Date.parse(a.dateTime);
                    });
                this.setState({
                    feed,
                    isReady: true
                });
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

    createPostHandler(data) {
        if (!data || !data.text) {
            return;
        }
        console.log(data);
        let {feed} = this.state;
        Api.createPost(data.text)
            .then((created) => {
                console.log('Created initial:');
                console.log(created);
                if (data.imageFile) {
                    return Api.attachImage(created.id, data.imageFile);
                }
                return Promise.resolve(created);
            })
            .then((created) => {
                console.log('Created after upload:');
                console.log(created);
                // created.user = this.state.me;
                feed.unshift(created);
                this.setState({ feed: this.state.feed });
            })
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
                    <CreatePost onSubmitHandler={ (data) => this.createPostHandler(data) }/>
                    <PostList items={this.state.feed} />
                </div>

                <div class="right-fake"></div>
            </div>
        );
    }
}

export default Feed;