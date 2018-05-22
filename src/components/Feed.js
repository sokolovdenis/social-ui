import React, {Component} from 'react';

import Post from './Post'
import {getFeed} from '../api'

import './components.css';

class Feed extends Component {
    state = {
        posts: undefined
    };

    componentWillMount() {
        const {userId, token} = this.props.getUser();
        getFeed(userId, token).then(json => {
            this.setState({
                posts: json
            });
            document.title = "Your Feed";
        })
    }

    render() {
        if (this.state.posts === undefined) {
            return null;
        }
        
        let posts = this.state.posts.map((x) => {
            return <Post info={x} key={x.id}/>
        });
        return (
            <div>
                <div className="content_header">
                    <h1 align="center">Feed</h1>
                </div>
                {posts}
            </div>
        );
    }
}

export default Feed;
