import React, {Component} from 'react'
import './style.css'

import {API_URL} from './settings'
import {get_token, get_id} from "./auth";

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
            post_fetched: false,
            post: null,
        };

        this.fetch_info = this.fetch_info.bind(this);
        this.update_post = this.update_post.bind(this);
    }

    update_post(json) {
        this.state.post = json;
        this.setState({['post_fetched']: true})
    }

    fetch_info(id) {
        fetch(API_URL + 'users/' + id + '/posts/feed', {
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
        const id = get_id();
        if (!this.state.start) {
            this.state.start = true;
            this.fetch_info(id);
        }
        console.log(this.state.info);

        if (this.state.post_fetched) {
            let element = <div className="news-container">
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
