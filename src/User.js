import React, {Component} from 'react'
import './style.css'

import {API_URL} from './settings'
import {get_token} from "./auth";

import UserBlock from './UserBlock'
import PostBlock from './PostBlock'

function check_code(response) {
    if (response.status !== 200) {
        if (response.status === 401) {
            alert('Auth error')
        }
        if (response.status === 404) {
            alert('No user')
        }
        return;
    }
    return response.json()
}

class User extends Component {
    constructor() {
        super();
        this.state = {
            start: false,
            info_fetched: false,
            info: null,
            followers_fetched: false,
            followers: null,
            following_fetched: false,
            following: null,
            post_fetched: false,
            post: null,
        };

        this.fetch_info = this.fetch_info.bind(this);
        this.update_info = this.update_info.bind(this);
        this.update_followers = this.update_followers.bind(this);
        this.update_following = this.update_following.bind(this);
        this.update_post = this.update_post.bind(this);
    }

    update_post(json) {
        this.state.post = json;
        this.setState({['post_fetched']: true})
    }

    update_info(json) {
        this.state.info = json;
        this.setState({['info_fetched']: true})
    }

    update_followers(json) {
        this.state.followers = json;
        this.setState({['followers_fetched']: true})
    }

    update_following(json) {
        this.state.following = json;
        this.setState({['following_fetched']: true})
    }

    fetch_info(id) {
        fetch(API_URL + 'users/' + id + '/followers', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + get_token(),
            }
        })
            .then(response => check_code(response))
            .then(json => this.update_followers(json))
            .catch(function (error) {
                console.log('Request failed', error)
            });


        fetch(API_URL + 'users/' + id + '/followings', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + get_token(),
            }
        })
            .then(response => check_code(response))
            .then(json => this.update_following(json))
            .catch(function (error) {
                console.log('Request failed', error)
            });


        fetch(API_URL + 'users/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + get_token(),
            }
        })
            .then(response => check_code(response))
            .then(json => this.update_info(json))
            .catch(function (error) {
                console.log('Request failed', error)
            });

        fetch(API_URL + 'users/' + id + '/posts/wall', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + get_token(),
            }
        })
            .then(response => check_code(response))
            .then(json => this.update_post(json))
            .catch(function (error) {
                console.log('Request failed', error)
            });
    }

    render() {
        const id = this.props.match.params.id;
        if (!this.state.start) {
            this.state.start = true;
            this.fetch_info(id);
        }
        console.log(this.state.info);

        if (this.state.info_fetched && this.state.following_fetched
            && this.state.followers_fetched && this.state.post_fetched) {
            let element = <div className="news-container">
                <UserBlock
                    name={this.state.info.name}
                    birthday={this.state.info.birthday}
                    imageUrl={this.state.info.imageUrl}
                    followers={this.state.followers.length.toString()}
                    followings={this.state.following.length.toString()}
                    info={this.state.info.info}
                    id={id}
                />
                {
                    this.state.post.map((item) => (
                        <PostBlock name={item.user.name} imageUrl={item.user.imageUrl} text={item.text} postImg={item.imageUrl}/>
                    ))
                }
            </div>;
            return element
        }
        else {
            return <div/>;
        }
    }
}

export default User;
