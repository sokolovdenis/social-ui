import React from 'react';

import Api from '../api'

import UserInfo from './user_info'
import PostList from './post_list'
import Loading from './loading'
import CreatePost from './CreatePost'

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            me: {},
            feed: []
        }
    }

    componentDidMount() {
        let state = {
            isReady: false,
            me: {},
            stats: {},
            followers: [],
            followings: [],
            feed: [],
        };

        Api.getMyself()
            .then(me => {
                console.log(me);
                state.me = me;
                let apiCalls = [
                    Api.getUserPosts(state.me.id)
                        .then(posts => {
                            state.feed = state.feed.concat(posts);
                            state.stats.postsCount = posts.length;
                            this.setState(state);
                        }),

                    Api.getUsersFollowers(state.me.id)
                        .then(followers => {
                            state.followers = followers;
                            state.stats.followersCount = followers.length;
                            this.setState(state);
                        }),

                    Api.getUsersFollowings(state.me.id)
                        .then(followings => {
                            state.followings = followings;
                            state.stats.followingsCount = followings.length;
                            this.setState(state);
                        }),

                    Api.getUserFeed(state.me.id)
                        .then(feed => {
                            console.log(feed);
                            state.feed = state.feed.concat(feed);
                            this.setState(state);
                        })
                ];
                return Promise.all(apiCalls)
            })
            .then(() => {
                console.log(this.state);
                state.feed.sort((a, b) => {
                    return Date.parse(b.dateTime) - Date.parse(a.dateTime);
                });
                this.setState({ isReady: true});
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
        console.log(data);
        let {feed} = this.state;
        if (data.imageFile) {
            alert(`Attaching the image  ${data.imageFile}`);
            Api.attachImage(53, data.imageFile)
                .then(() => {

                })
        }
        Api.createPost(data.text)
            .then((created) => {
                created.user = this.state.me;
                console.log(created);
                feed.unshift(created);
                console.log(feed);
                this.setState({feed: this.state.feed});
                if (data.image) {
                    return Api.attachImage(created.id, data.image);
                }
            })
    }

    render() {
        if (!this.state.isReady) {
            return (<Loading />)
        }

        return (
            <div className="page-content" >
                <UserInfo user={this.state.me} stats={this.state.stats} />

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