import React, {Component} from 'react';

import Post from './Post'
import {getWall} from '../api'

import './components.css';

class Wall extends Component {
    state = {
        posts: undefined
    };

    componentWillMount() {
        const {token} = this.props.getUser();
        getWall(this.props.userId, token).then(json => {
            this.setState({
                posts: json
            })
        });
    }

    render() {
        if (this.state.posts === undefined) {
            return null
        }

        let posts = this.state.posts.map((x) => {
            return <Post info={x} key={x.id}/>
        });
        return (
            <div>
                <div className="content_header">
                    <h1 align="center">Wall</h1>
                </div>
                {posts}
            </div>
        );
    }
}

export default Wall;
