import React, { Component } from 'react';
import './PostsList.css'
import Post from './Post'

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = 'https://social-webapi.azurewebsites.net/api/';

        this.state = {
            token: props.token,
            userId: props.userId,
            isMe: props.isMe,
           
            posts: []
        }

        this.getUserWall();
    }

    getUserWall() {
        const url = this.apiUrl + 'users/' + this.state.userId + '/posts/wall';
        //const url = this.apiUrl + 'users/' + 42 + '/posts/wall';
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

    handleNewPostSubmit(event) {
        event.preventDefault();

        const newPostData = {
            text: this.newPostText.value
        };
        const url = this.apiUrl + 'users/me/posts';
        const responsePromise = fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + this.state.token
            },
            body: JSON.stringify(newPostData)
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
            .then(data => this.onRenderWithNewPost(data))
            .catch(function (error) {
                alert(error);
            });
        this.newPostText.value = '';
    }

    onRenderWithNewPost(data) {
        this.state.posts = [];
        this.setState({
            posts: this.state.posts
        });

        this.getUserWall();
    }

    render() {
        const newPostBlock = this.state.isMe ? (<article class="new-post">
            <form onSubmit={(event) => this.handleNewPostSubmit(event)} id="new-post-submit-form">
                <input type="text" class="add-post-text" placeholder="Что у вас нового?" ref={input => this.newPostText = input}/>
                <input type="submit" class="add-post-button" value="Отправить" />
            </form>
        </article>) : (<p></p>);

        return (
            <section class="user-posts">
                {newPostBlock}
                {this.state.posts.map(post =>
                    <Post
                        authorName={post.user.name}
                        date={post.dateTime}
                        text={post.text}
                    />
                )}
            </section>
        );
    }
}

export default PostsList;