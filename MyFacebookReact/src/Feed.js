import React, { Component } from 'react';
//import './UsersList.css';
import Post from './Post';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = 'https://social-webapi.azurewebsites.net/api/';

        this.state = {
            token: props.token,
            myId: -1,
            posts: []
        }

        this.getUserId();
    }

    getUserId() {
        const url = this.apiUrl + 'users/me';
        const responsePromise = fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + this.state.token
            }
        });

        responsePromise
            .then(function (response) {
                const status = response.status;
                if (status >= 200 && status <= 299) {
                    return response.json();
                }
                else {
                    return Promise.reject(response.statusText);
                }
            })
            .then((data) => {
                this.state.myId = data.id;
                this.setState({
                    myId: this.state.myId
                });
                this.getFeed();
            })
            .catch(function (error) {
                alert(error);
            });
    }

    getFeed() {
        const url = this.apiUrl + 'users/' + this.state.myId + '/posts/feed';
        const responsePromise = fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + this.state.token
            }
        });
        responsePromise
            .then(function (response) {
                const status = response.status;
                if (status >= 200 && status <= 299) {
                    return response.json();
                }
                else {
                    return Promise.reject(response.statusText);
                }
            })
            .then(data => this.onLoadPosts(data))
            .catch(function (error) {
                alert(error);
            });
    }

    onLoadPosts(items) {
        for (var i = 0; i < items.length; i++) {
            let curPost = {
                id: items[i].id,
                text: items[i].text,
                imageUrl: items[i].imageUrl,
                dateTime: items[i].dateTime,
                user: items[i].user
            }
            this.state.posts.push(curPost);
        }

        this.setState({
            posts: this.state.posts
        });
    }
    
    render() {

        return (
            <main>
                <section class="feed">
                    {this.state.posts.map(post =>
                        <Post
                            authorName={post.user.name}
                            date={post.dateTime}
                            text={post.text}
                            imageUrl={post.imageUrl}
                        />
                    )}
                </section>
            </main>
        );
    }
}

export default Feed;